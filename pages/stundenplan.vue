<template>
	<div class="container mx-auto p-4">

		<p class="text-3xl font-bold mb-4">Stundenplan</p>
		<p class="text-lg mb-4" v-show="data.length">
			{{
				new Date(Number(Object.keys(groupedByDay)[page - 1])).toLocaleDateString("de-DE", {
					weekday: "long",
					year: "numeric", month: "long", day: "numeric"
				})
			}}
		</p>

		<span v-if="!data.length" class="space-y-3">
			<USkeleton class="mb-4 h-8 w-80" :ui="{ rounded: 'rounded-xl' }" />
			<USkeleton class="mb-4 h-8 w-80" :ui="{ rounded: 'rounded-xl' }" />
			<USkeleton class="mb-4 h-64 w-full" :ui="{ rounded: 'rounded-xl' }" />
		</span>
		<ClientOnly v-else>

			<span class="mb-4 flex text-center items-center space-x-4">
				<UPagination v-model="page" :total="data.length" />
				<UButton v-if="Object.keys(groupedByDay).indexOf(today.toString()) !== -1"
					:class="{ 'opacity-0': page == Object.keys(groupedByDay).indexOf(today.toString()) + 1 }"
					class="py-2" @click="page = Object.keys(groupedByDay).indexOf(today.toString()) + 1">
					Zurück zu Heute
				</UButton>
			</span>

			<UTable :rows="schedule[page - 1]" :loading="!hasLoaded" :loading-state="{ label: 'Laden...' }"
				class="w-full" />

		</ClientOnly>

		<button @click="logout()" class="mt-5 p-2 bg-primary text-white rounded">
			Anmeldedaten zurücksetzen
		</button>

	</div>
</template>

<script setup>
definePageMeta({
	keepalive: true,
	key: route => route.fullPath,
})

const router = useRouter();

const localData = ref([]);

const username = useCookie("username");
const password = useCookie("password");
const isLoggedIn = useState("isLoggedIn", (() => false))

const today = new Date().setHours(0, 0, 0, 0);
const page = ref(1);

const data = useState('stundenplan', (() => []));

const groupedByDay = useState('groupedByDay', (() => ({})));

const schedule = computed(() => Object.values(groupedByDay.value));

const hasLoaded = useState('hasLoaded', (() => false));

watch(data, (newVal) => {
	groupedByDay.value = {};
	newVal.forEach((item) => {
		const day = new Date(item["start"] * 1000).setHours(0, 0, 0, 0);

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
	for (const key in groupedByDay.value) {
		if (Number(key) < new Date().setHours(0, 0, 0, 0) - 86400000) {
			delete groupedByDay.value[key];
		}
	}
});

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

	const storedValue = localStorage.getItem('stundenplan');
	localData.value = storedValue ? JSON.parse(storedValue) : []

	if (localData.value.length !== 0) {
		data.value = localData.value;
	}


	// Watch for changes in the data and update localStorage
	watch(localData, (newValue) => {
		localStorage.setItem('stundenplan', JSON.stringify(newValue));
	}, { deep: true });



	const response = await $fetch(
		`https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Froom%2Fjson%3Fuserid%3D${username.value}%26hash%3D${password.value}%26t%3D${Math.floor(Date.now() / 1000)}%26_%3D${Date.now()}`
	);

	data.value = response;
	localData.value = data.value;

	hasLoaded.value = true;
});

function logout() {
	username.value = "";
	password.value = "";
	isLoggedIn.value = false;
	router.push("/login");
}
</script>
