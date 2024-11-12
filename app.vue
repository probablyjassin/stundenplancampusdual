<template>
	<div>
		<UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
		<NuxtPage />
	</div>
</template>

<script setup>
useHead
	({
		title: 'Stundenplan',
		meta: [{
			name: 'description',
			content: 'Einfache, mobile-first WebApp für den CampusDual-Stundenplan. Support für Firefox und Chromium.'
		}],
	})

const links = [
	{
		label: "Home",
		icon: "i-heroicons-home",
		to: "/",
	},
	{
		label: "Stundenplan",
		icon: "i-heroicons-clock",
		to: "/stundenplan",
	},
	{
		label: "Wie finde ich mein Passwort (Hash)?",
		icon: "i-heroicons-document-text",
		to: "/hash",
	},
];

const username = useCookie("username")
const password = useCookie("password")
const isLoggedIn = useState("isLoggedIn", (() => false))

onMounted(async () => {
	try {
		const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`
		const response = await $fetch(test_url)
		isLoggedIn.value = !!(response == 0)
	} catch (error) {
		isLoggedIn.value = false
	}
})
</script>
