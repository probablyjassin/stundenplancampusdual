<script setup lang="ts">
	import { h } from "vue";
	import type { TableColumn } from "@nuxt/ui";

	type TimeSlot = {
		time: string;
		monday?: string;
		tuesday?: string;
		wednesday?: string;
		thursday?: string;
		friday?: string;
	};

	const data = ref<TimeSlot[]>([
		{
			time: "08:00 - 09:30",
			monday: "VS Analysis",
			tuesday: "VS Wirtschaftsenglisch",
			wednesday: "VS Digitaltechnik",
			thursday: "VS Analysis",
			friday: "VS Wirtschaftsenglisch",
		},
		{
			time: "10:00 - 11:30",
			monday: "VS Analysis",
			tuesday: "VS Wirtschaftsenglisch",
			thursday: "VS Digitaltechnik",
			friday: "VS Digitaltechnik",
		},
		{
			time: "12:00 - 13:30",
			monday: "VS Digitaltechnik",
			wednesday: "VS Analysis",
			thursday: "VS Digitaltechnik",
			friday: "VS Digitaltechnik",
		},
		{
			time: "14:00 - 15:30",
			monday: "VS Digitaltechnik",
			wednesday: "VS Analysis",
			thursday: "VS Wirtschaftsenglisch",
		},
	]);

	const columns: TableColumn<TimeSlot>[] = [
		{
			accessorKey: "time",
			header: "Zeit",
		},
		{
			accessorKey: "monday",
			header: "Montag",
		},
		{
			accessorKey: "tuesday",
			header: "Dienstag",
		},
		{
			accessorKey: "wednesday",
			header: "Mittwoch",
		},
		{
			accessorKey: "thursday",
			header: "Donnerstag",
		},
		{
			accessorKey: "friday",
			header: "Freitag",
		},
	];
</script>

<template>
	<UTable
		:data="data"
		:columns="columns"
		:ui="{
			td: 'whitespace-normal py-4',
		}" />
</template>
