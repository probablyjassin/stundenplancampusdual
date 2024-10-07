<template>
	<p class="text-3xl">Login</p>
	<p>Benutzername: Matrikelnummer (500xxx)</p>
	<div>
		<p>Passwort: Hash von der Campus-Dual API</p>
		<NuxtLink to="/hash" class="text-blue-400 underline">(Wie bekomme ich den?)</NuxtLink>
	</div>
	<div class="flex flex-col space-y-5 max-w-md mx-auto">
		<input
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			v-model="username"
			:class="{ 'border-red-500': !usernameValid }"
			class="p-2 border rounded" />
		<p v-if="!usernameValid" class="text-red-500 text-sm">Bitte geben Sie einen Benutzernamen ein.</p>

		<input
			type="password"
			name="Hash"
			id="hash"
			placeholder="Passwort (Hash)"
			v-model="password"
			:class="{ 'border-red-500': !passwordValid }"
			class="p-2 border rounded" />
		<p v-if="!passwordValid" class="text-red-500 text-sm">Bitte geben Sie ein Passwort ein.</p>

		<button @click="login()" class="p-3 bg-primary text-text rounded">Login</button>
		<p v-if="error" class="text-red-500 text-sm">Der Login ist fehlgeschlagen. Überprüfe ob du tatsächlich deinen aktuellen Hash von der CampusDual API hast.</p>
	</div>
	<NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
	const router = useRouter();

	const username = ref("");
	const password = ref("");
	const usernameValid = ref(true);
	const passwordValid = ref(true);

    const error = ref(false);

	const usernameCookie = useCookie("username");
	const passwordCookie = useCookie("password");

	async function login() {
		usernameValid.value = username.value !== "";
		passwordValid.value = password.value !== "";

		if (!usernameValid.value || !passwordValid.value) {
			return;
		}

		const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`;
		const response = await $fetch(test_url);

		if (response == 0) {
			usernameCookie.value = username.value;
			passwordCookie.value = password.value;
			return router.push("/stundenplan");
		}
        error.value = true;
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
