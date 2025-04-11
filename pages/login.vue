import { validateInputs } from "../composables/validation";
<template>
    <div class="flex flex-col justify-center container p-4">
        <p class="text-3xl">Login</p>
        <p>
            <span class="text-primary">Benutzername:</span> Matrikelnummer
            (500xxx)
        </p>
        <div>
            <span>
                <span class="text-primary">Passwort:</span> Hash von der
                Campus-Dual API
            </span>
            <NuxtLink to="/hash" class="text-accent underline"
                >(Wie bekomme ich den?)</NuxtLink
            >
        </div>
    </div>
    <form
        v-on:submit.prevent="login"
        class="flex flex-col space-y-5 max-w-md p-4"
    >
        <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            v-model="username"
            :class="{ 'border-red-500': !usernameValid }"
            class="p-2 border rounded"
        />
        <p v-if="!usernameValid" class="text-red-500 text-sm">
            Bitte geben Sie einen gültigen Benutzernamen ein.
        </p>

        <input
            type="password"
            name="Hash"
            id="hash"
            placeholder="Passwort (Hash)"
            v-model="password"
            :class="{ 'border-red-500': !passwordValid }"
            class="p-2 border rounded"
        />
        <p v-if="!passwordValid" class="text-red-500 text-sm">
            Bitte geben Sie ein gültiges Passwort ein.
        </p>

        <UButton
            type="submit"
            :loading="isLoading && !error"
            class="p-3 bg-primary text-text rounded block"
            >Login
        </UButton>

        <p v-if="error" class="text-red-500 text-sm">
            Der Login ist fehlgeschlagen. Bitte überprüfe deine Matrikelnummer
            und ob du tatsächlich deinen aktuellen Hash von der CampusDual API
            hast.
        </p>
    </form>
</template>

<script setup lang="ts">
const { getCampusData } = useCampus();
const router = useRouter();
const route = useRoute();

const username = ref("");
const password = ref("");
const usernameValid = ref(true);
const passwordValid = ref(true);

const isLoading = ref(false);
const error = ref(false);

const usernameCookie = useCookie("username", {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
});
const passwordCookie = useCookie("password", {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
});

async function login() {
    if (validateInputs()) {
        isLoading.value = true;
        // Try fetching some data to validate login.
        try {
            const response = await getCampusData("semester", {
                username: username.value,
                password: password.value,
            });
            console.log(response);
            if (isResponseSuccessful(response)) {
                console.log("response was accepted. logging in");
                usernameCookie.value = username.value;
                passwordCookie.value = password.value;
                router.push({ path: "/dash/stundenplan" });
                return;
            } else {
                error.value = true;
            }
        } catch (campusError) {
            console.error(campusError);
            error.value = true;
        }
    }
    isLoading.value = false;
    usernameCookie.value = null;
    passwordCookie.value = null;
}
// TODO:
// - link the nice campusdual api-spec lol
function validateInputs(): boolean {
    usernameValid.value = /^\d{7}$/.test(username.value);
    passwordValid.value = /^[0-9a-fA-F]{32}$/.test(password.value);
    return usernameValid.value && passwordValid.value;
}
</script>

<style scoped>
.border-red-500 {
    border-color: #f56565;
}

.text-red-500 {
    color: #f56565;
}
</style>
