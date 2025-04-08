<template>
	<UCard>
		<UCalendar v-model="value" />
	</UCard>
</template>

<script setup lang="ts">
import { CalendarDate, type CalendarDateTime } from "@internationalized/date";

const value = useState("selected-date", () => new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
</script>
