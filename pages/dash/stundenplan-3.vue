<template>
	<UTable
		:columns="columns"
		:data="tableData"
		:ui="{
			td: 'whitespace-pre-wrap min-h-[60px] align-top',
			th: 'text-center',
		}" />
</template>

<script setup lang="ts">
	import type { TableColumn } from "@nuxt/ui";
	const { schedule, pending, refresh } = useSchedule();
	const { CampusToSimple, timestampToMonday } = useDataTransform();
	const currentTimestamp = Math.floor(Date.now() / 1000);

	definePageMeta({
		layout: "dash",
		keepalive: true,
		key: (route) => route.fullPath,
	});

	const lessonsThisWeek = ref(CampusToSimple(schedule.value)[timestampToMonday(currentTimestamp)] || []);

	const timeSlots = ["08:00-09:30", "10:00-11:30", "12:00-13:30", "14:00-15:30", "16:00-17:30"];

	// Transform lessons into a format suitable for the table
	const tableData = computed(() => {
		return timeSlots.map((timeSlot) => {
			const [start] = timeSlot.split("-");
			const row: Record<string, string> = { time: timeSlot };

			// Add empty cells for each weekday
			["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach((day) => {
				row[day] = "";
			});

			// Fill in lessons for this time slot
			lessonsThisWeek.value.forEach((lesson) => {
				if (lesson.start === start) {
					// Get day of week from timestamp
					const date = new Date(lesson.timestamp * 1000);
					const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
					row[dayName] = `${lesson.title}\n${lesson.room}`;
				}
			});

			return row;
		});
	});

	// Define table columns
	const columns: TableColumn[] = [
		{ key: "time", label: "Time" },
		{ key: "Monday", label: "Monday" },
		{ key: "Tuesday", label: "Tuesday" },
		{ key: "Wednesday", label: "Wednesday" },
		{ key: "Thursday", label: "Thursday" },
		{ key: "Friday", label: "Friday" },
	];

	onMounted(async () => {
		refresh();
	});
</script>
