<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>
useHead({
	title: "Stundenplan",
	meta: [
		{
			name: "description",
			content: "Einfache, mobile-first WebApp für den CampusDual-Stundenplan. Support für Firefox und Chromium.",
		},
	],
});

const username = useCookie("username");
const password = useCookie("password");
const isLoggedIn = useState("isLoggedIn", () => false);

onMounted(async () => {
	try {
		const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`;
		const response = await $fetch(test_url);
		isLoggedIn.value = !!(typeof response === 'number');
	} catch (error) {
		isLoggedIn.value = false;
	}
});
</script>
