<template>
	<div class="flex flex-col justify-center container p-4">
		<p class="text-3xl">Login</p>
		<p><span class="text-primary">Benutzername:</span> Matrikelnummer (500xxx)</p>
		<div>
			<span> <span class="text-primary">Passwort:</span> Hash von der Campus-Dual API </span>
			<NuxtLink to="/hash" class="text-accent underline">(Wie bekomme ich den?)</NuxtLink>
		</div>
	</div>
	<div class="flex flex-col space-y-5 max-w-md p-4">
		<input
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			v-model="username"
			:class="{ 'border-red-500': !usernameValid }"
			class="p-2 border rounded-sm" />
		<p v-if="!usernameValid" class="text-red-500 text-sm">Bitte geben Sie einen Benutzernamen ein.</p>

		<input
			type="password"
			name="Hash"
			id="hash"
			placeholder="Passwort (Hash)"
			v-model="password"
			:class="{ 'border-red-500': !passwordValid }"
			class="p-2 border rounded-sm" />
		<p v-if="!passwordValid" class="text-red-500 text-sm">Bitte geben Sie ein Passwort ein.</p>

		<UButton @click="login" :loading="isLoading && !error" class="p-3 bg-primary text-text rounded-sm block">Login </UButton>

		<p v-if="error" class="text-red-500 text-sm">
			Der Login ist fehlgeschlagen. Überprüfe ob du tatsächlich deinen aktuellen Hash von der CampusDual API hast.
		</p>
	</div>
</template>

<script setup>
	const { getCampusData } = useCampus();
	const router = useRouter();
	const route = useRoute();

	const username = ref("");
	const password = ref("");
	const usernameValid = ref(true);
	const passwordValid = ref(true);

	const isLoading = ref(false);
	const error = ref(false);

	const usernameCookie = useCookie("username", { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) });
	const passwordCookie = useCookie("password", { expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) });

	async function login() {
		isLoading.value = true;

		usernameValid.value = username.value !== "";
		passwordValid.value = password.value !== "";

		if (!usernameValid.value || !passwordValid.value) {
			return;
		}

		usernameCookie.value = username.value;
		passwordCookie.value = password.value;

		const response = await getCampusData("timeline");
		console.log(response);

		if (typeof response != "string") {
			router.push({ path: "/dash/stundenplan" });
			return;
		}
		error.value = true;
		isLoading.value = false;
		usernameCookie.value = null;
		passwordCookie.value = null;
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
