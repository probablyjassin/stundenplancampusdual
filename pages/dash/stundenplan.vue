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

const selectedDate: Ref<CalendarDate> = useState("selected-date")

definePageMeta({
	layout: "dash",
	keepalive: true,
	key: (route) => route.fullPath,
});

const lessonsThisWeek = computed(() => {
	if (!schedule.value) return [];

	const monday = selectedDate.value
		? timestampToMonday(parseCalendarDate(selectedDate.value).getTime() / 1000)
		: timestampToMonday(Math.floor(Date.now() / 1000));

	const transformed = CampusToSimple(schedule.value);
	console.log('Monday timestamp:', monday);
	console.log('Available weeks:', Object.keys(transformed));
	console.log('Lessons for selected week:', transformed[monday]);

	return transformed[monday] || [];
});

// Add a watcher to debug state changes
watch([selectedDate, schedule], ([newDate, newSchedule]) => {
	console.log('Date changed to:', newDate);
	console.log('Schedule state:', !!newSchedule);
}, { deep: true });

onMounted(async () => {
	refresh();
});
</script>
