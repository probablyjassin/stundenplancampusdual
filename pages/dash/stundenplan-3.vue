<template>
	<Timetable :lessons="lessonsThisWeek" class="h-full"></Timetable>
</template>

<script setup lang="ts">
const { schedule, pending, refresh } = useSchedule();
const { CampusToSimple, timestampToMonday } = useDataTransform();

definePageMeta({
	layout: "dash",
	keepalive: true,
	key: (route) => route.fullPath,
});

const lessonsThisWeek = computed(() => {
	return CampusToSimple(schedule.value)[timestampToMonday(Math.floor(Date.now() / 1000))] || [];
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
