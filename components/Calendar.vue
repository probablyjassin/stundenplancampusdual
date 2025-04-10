<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
	dateStyle: 'medium'
})

const date = new Date();

const selectedDate = useState("selected-date", (() => (
	new CalendarDate(
		date.getFullYear(), date.getMonth() + 1, date.getDate()
	)).toDate(getLocalTimeZone())))

const modelValue = ref(new CalendarDate(
	date.getFullYear(), date.getMonth() + 1, date.getDate()
))

watch(modelValue, (newDate) => {
	selectedDate.value = newDate.toDate(getLocalTimeZone())
})
</script>

<template>
	<UPopover>
		<UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
			{{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
		</UButton>

		<template #content>
			<UCalendar v-model="modelValue" class="p-2" />
		</template>
	</UPopover>
</template>
