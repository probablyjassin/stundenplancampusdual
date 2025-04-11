<template>
	<UNavigationMenu variant="pill" :items="items" class="w-full justify-center" />
	<slot />
</template>

<script setup lang="ts">
	import type { NavigationMenuItem } from "@nuxt/ui";

	const items = ref<NavigationMenuItem[]>([
		{
			label: "Dashboard",
			icon: "i-heroicons-home",
			to: "/dash",
		},
		{
			label: "Stundenplan",
			icon: "i-heroicons-clock",
			to: "/dash/stundenplan",
		},
		{
			label: "Logout",
			icon: "i-heroicons-arrow-turn-down-left",
			to: "/logout",
		},
	]);
</script>
