<template>
	<div>
		<UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
		<NuxtPage />
	</div>
</template>

<script setup>
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
</script>
