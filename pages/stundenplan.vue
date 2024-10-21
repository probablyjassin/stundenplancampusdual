<template>
	<ClientOnly>
		<div class="container mx-auto p-4">
			<p class="text-3xl font-bold mb-4">Stundenplan</p>
			<p class="text-lg mb-4" v-show="data.length">
				{{
					new Date(Number(Object.keys(groupedByDay)[page - 1])).toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
				}}
			</p>
			<span class="mb-4 flex text-center items-center space-x-4">
				<UPagination v-model="page" :total="data.length" />
				<UButton
					v-if="Object.keys(groupedByDay).indexOf(today.toString()) !== -1"
					:class="{ 'opacity-0': page == Object.keys(groupedByDay).indexOf(today.toString())+1 }"
					class="py-2"
					@click="page = Object.keys(groupedByDay).indexOf(today.toString())+1">
					Zurück zu Heute
				</UButton>
			</span>
			<UTable :rows="schedule[page - 1]" class="w-full" :loading="!hasLoaded" :loading-state="{ label: 'Laden...' }" />
			<button @click="logout()" class="mt-5 p-2 bg-primary text-white rounded">Anmeldedaten zurücksetzen</button>
		</div>
		{{ data }}
	</ClientOnly>
</template>

<script setup>
	const router = useRouter();

	const username = useCookie("username");
	const password = useCookie("password");

	const today = new Date().setHours(0, 0, 0, 0);
	const page = ref(1);

	const groupedByDay = useState('groupedByDay', (() => ({})));
	const data = useState('stundenplan', (() => []));
	const schedule = computed(() => Object.values(groupedByDay.value));

	const hasLoaded = useState('hasLoaded', (() => false));

	watch(groupedByDay.value, (newVal) => {
		const todayIndex = Object.keys(newVal).indexOf(today.toString());
		if (todayIndex !== -1) {
			page.value = todayIndex + 1;
		} else {
			const futureDates = Object.keys(newVal).filter(date => Number(date) > today);
			if (futureDates.length > 0) {
				page.value = Object.keys(newVal).indexOf(futureDates[0]) + 1;
			} else {
				page.value = 1;
			}
		}
	});

	onMounted(async () => {
		if (data.value.length !== 0) return;

		const response = await $fetch(
			`https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Froom%2Fjson%3Fuserid%3D${username.value}%26hash%3D${password.value}%26t%3D${Math.floor(Date.now() / 1000)}%26_%3D${Date.now()}`
		);
		data.value = response;

		data.value.forEach((item) => {
			const day = new Date(item["start"] * 1000).setHours(0, 0, 0, 0);
			console.log(day.toString());

			if (!groupedByDay.value[day]) {
				groupedByDay.value[day] = [];
			}
			groupedByDay.value[day].push({
				Kurs: item["description"],
				Raum: item["sroom"],
				Dozent: item["sinstructor"] || "---",
				Von: new Date(item["start"] * 1000).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", hour12: false }),
				Bis: new Date(item["end"] * 1000).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", hour12: false }),
				Bemerkungen: item["remarks"] || "---",
			});
		});
		console.log(Object.keys(groupedByDay.value));

		hasLoaded.value = true;
	});

	function logout() {
		username.value = "";
		password.value = "";
		router.push("/login");
	}
</script>
