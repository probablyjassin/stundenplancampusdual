<template>
	<UNavigationMenu variant="pill" :items="items" class="border-b border-gray-200 dark:border-gray-800" />
	<slot />
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";

	const items = ref<NavigationMenuItem[]>([
		{
			label: "Home",
			icon: "i-heroicons-home",
			to: "/",
		},
		{
			label: "Wie finde ich mein Passwort (Hash)?",
			icon: "i-heroicons-document-text",
			to: "/hash",
		},
		{
			label: "Login",
			icon: "i-heroicons-finger-print",
			to: "/login",
		},
	]);
</script>
