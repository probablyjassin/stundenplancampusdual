<template>
	<div class="container mx-auto p-4">
		<p class="text-3xl font-bold mb-4">Stundenplan</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<!-- Calendar Section -->
			<div class="bg-white rounded-lg p-4 shadow">
				<UCalendar v-model="selectedDate" :disabled="(date) => !Object.keys(groupedByDay).includes(date.valueOf().toString())" />
			</div>

			<!-- Schedule Section -->
			<div class="bg-white rounded-lg p-4 shadow">
				<span v-if="!isMounted" class="space-y-3">
					<USkeleton class="mb-4 h-8 w-80" :ui="{ rounded: 'rounded-xl' }" />
					<USkeleton class="mb-4 h-80 w-full" :ui="{ rounded: 'rounded-xl' }" />
				</span>
				<ClientOnly v-else>
					<div v-if="selectedDaySchedule.length" class="space-y-4">
						<p class="text-lg font-medium">
							{{ formatDate(selectedDate) }}
						</p>
						<UTable :rows="selectedDaySchedule" :columns="columns" :loading="!hasLoaded" :loading-state="{ label: 'Laden...' }" />
					</div>
					<UAlert v-else title="Keine Veranstaltungen" description="An diesem Tag finden keine Veranstaltungen statt." color="gray" />
				</ClientOnly>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "dash",
		keepalive: true,
		key: (route) => route.fullPath,
	});

	const { getCampusData } = useCampus();
	const router = useRouter();

	// State
	const localData = ref([]);
	const username = useCookie("username");
	const password = useCookie("password");
	const isLoggedIn = useState("isLoggedIn", () => false);
	const isMounted = ref(false);
	const data = useState("stundenplan", () => []);
	const groupedByDay = useState("groupedByDay", () => ({}));
	const hasLoaded = useState("hasLoaded", () => false);

	// Import CalendarDate from @internationalized/date
	import { parseDate } from "@internationalized/date";

	// Calendar state - replace the existing selectedDate declaration
	const selectedDate = ref(parseDate(new Date().toISOString().split("T")[0]));

	// Table columns
	const columns = [
		{ key: "Von", label: "Von" },
		{ key: "Bis", label: "Bis" },
		{ key: "Kurs", label: "Kurs" },
		{ key: "Raum", label: "Raum" },
		{ key: "Dozent", label: "Dozent" },
		{ key: "Bemerkungen", label: "Bemerkungen" },
	];

	// Computed
	const selectedDaySchedule = computed(() => {
		const timestamp = new Date(selectedDate.value.toString()).setHours(0, 0, 0, 0).toString();
		return groupedByDay.value[timestamp] || [];
	});

	// Methods
	function formatDate(date) {
		return new Date(date.toString()).toLocaleDateString("de-DE", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	// Watchers
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
				Von: new Date(item["start"] * 1000).toLocaleTimeString("de-DE", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				Bis: new Date(item["end"] * 1000).toLocaleTimeString("de-DE", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
				Bemerkungen: item["remarks"] || "---",
			});
		});

		// Remove past dates
		for (const key in groupedByDay.value) {
			if (Number(key) < new Date().setHours(0, 0, 0, 0) - 86400000) {
				delete groupedByDay.value[key];
			}
		}

		// Set initial selected date to first available date
		const dates = Object.keys(groupedByDay.value).map(Number).sort();
		if (dates.length > 0) {
			selectedDate.value = parseDate(new Date(dates[0]).toISOString().split("T")[0]);
		}
	});

	// Lifecycle
	onMounted(async () => {
		isMounted.value = true;
		if (data.value.length !== 0) return;

		const storedValue = localStorage.getItem("stundenplan");
		localData.value = storedValue ? JSON.parse(storedValue) : [];

		if (localData.value.length !== 0) {
			data.value = localData.value;
		}

		watch(
			localData,
			(newValue) => {
				localStorage.setItem("stundenplan", JSON.stringify(newValue));
			},
			{ deep: true }
		);

		const response = await getCampusData("room");

		if (response === null) {
			router.push("/");
			console.log("datafetching failed");
			return;
		}

		if (!arraysEqual(JSON.parse(JSON.stringify(localData.value)), response)) {
			data.value = response;
			localData.value = data.value;
		}

		hasLoaded.value = true;
	});

	// Utility
	function arraysEqual(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;

		for (var i = 0; i < a.length; ++i) {
			if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
		}
		return true;
	}
</script>
