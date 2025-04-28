<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('de-DE', {
	dateStyle: 'medium'
})

const { timestampToMonday, getMondayBeforeDateCopyrightBohdan } = useDataTransform()

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
			{{ modelValue ? 
			`${
			df.format(getMondayBeforeDateCopyrightBohdan(modelValue.toDate("Europe/Berlin")))
			} - ${
			 df.format(
				getMondayBeforeDateCopyrightBohdan(modelValue.toDate("Europe/Berlin")))
			}`
			: 'Select a date' }}
		</UButton>

		<template #content>
			<UCalendar v-model="modelValue" :year-controls="false" class="p-2" />
		</template>
	</UPopover>
	{{ modelValue.toDate("Europe/Berlin") }}
</template>
