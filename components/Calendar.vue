<template>
	<UCard>
		<UCalendar range v-model="selectedWeek" :min="minDate" :max="maxDate" :disabled="disabledDates" @update:model-value="handleWeekSelect" />
	</UCard>
</template>

<script setup lang="ts">
	import { CalendarDate, type CalendarDateTime } from "@internationalized/date";

	interface Props {
		modelValue?: number | null;
	}

	interface Emits {
		(e: "update:modelValue", value: number | null): void;
	}

	const props = defineProps<Props>();
	const emit = defineEmits<Emits>();

	// Calendar state
	const selectedWeek = ref({
		start: null as CalendarDate | null,
		end: null as CalendarDate | null,
	});

	// Get first Monday of current month as min date
	const minDate = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1);

	// Get last day of next month as max date
	const maxDate = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 2, 0);

	// Only allow selection of complete weeks (Mon-Sun)
	const disabledDates = (date: CalendarDateTime) => {
		const jsDate = new Date(date.toString());
		return jsDate.getDay() !== 1;
	};

	// Handle week selection
	const handleWeekSelect = () => {
		if (selectedWeek.value.start) {
			const startDate = new Date(selectedWeek.value.start.toString());
			if (startDate.getDay() === 1) {
				const timestamp = startDate.getTime();
				emit("update:modelValue", timestamp);

				const endDate = new Date(startDate);
				endDate.setDate(startDate.getDate() + 6);
				selectedWeek.value.end = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate());
			}
		}
	};

	onMounted(() => {
		// Set initial selection to current week's Monday
		const today = new Date();
		const monday = new Date(today);
		monday.setDate(today.getDate() - today.getDay() + 1);

		selectedWeek.value = {
			start: new CalendarDate(monday.getFullYear(), monday.getMonth() + 1, monday.getDate()),
			end: new CalendarDate(monday.getFullYear(), monday.getMonth() + 1, monday.getDate() + 6),
		};

		emit("update:modelValue", monday.getTime());
	});
</script>
