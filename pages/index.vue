<template>
	<div class="container p-4">
		<div class="flex flex-col space-y-5">
			<p class="text-4xl text-primary font-semibold mb-2">Stundenplan für CampusDual</p>
			<p>
				Eine simple WebApp, für den Stundenplan von CampusDual. <br />
				Mit einem Design, dass auf Mobile auch tatsächlich nutzbar ist.
			</p>
			<p>
				Die Seite ist in NuxtJS mit TailwindCSS geschrieben. <br />
				Anders als auf CampusDual, werden die Daten nur einmal gefetched; <br />
				zwischen Einträgen wechseln dauert also keine Ewigkeit!
			</p>
			<span>
				<p>Zum Github-Repo:</p>
				<a class="text-accent underline" href="https://github.com/probablyjassin/studenplancampusdual">probablyjassin/stundenplancampusdual</a>
			</span>
			<UButton v-if="isLoggedIn" to="/dash/stundenplan" block class="w-1/3">Zum Stundenplan</UButton>
		</div>
	</div>
</template>

<script setup>
	const isLoggedIn = useState("isLoggedIn", (() => false))
</script>
