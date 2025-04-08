<template>
	<div class="p-4">
		<UPopover>
			<UButton icon="i-heroicons-calendar-days" color="neutral" variant="subtle" />

			<template #content>
				<Calendar></Calendar>
			</template>
		</UPopover>
		{{ selectedDate }}
		<Timetable :lessons="lessonsThisWeek" class="h-full"></Timetable>
	</div>
</template>

<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";

const { schedule, pending, refresh } = useSchedule();
const { CampusToSimple, timestampToMonday } = useDataTransform();
const { parseCalendarDate } = useCalendarDate();
const selectedDate = useState("selected-date", () => {
	const date = new Date();
	return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
});

definePageMeta({
	layout: "dash",
	keepalive: true,
	key: (route) => route.fullPath,
});

const lessonsThisWeek = computed(() => {
	return CampusToSimple(schedule.value)[
		timestampToMonday(Math.floor(Date.now() / 1000))
	] || [];
});

/* watch(() => schedule.value, (newSchedule) => {
	if (newSchedule) {
		lessonsThisWeek.value = CampusToSimple(newSchedule)[timestampToMonday(currentTimestamp)] || [];
	}
}, { immediate: true }); */

onMounted(async () => {
	refresh();
});
</script>
