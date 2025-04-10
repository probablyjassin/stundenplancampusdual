<template>
    <div class="w-full h-full overflow-x-auto">
        <table class="w-full border-separate border-spacing-0 rounded-lg bg-accent-50 dark:bg-accent-950">
            <thead>
                <tr>
                    <th
                        class="sticky left-0 z-20 bg-accent-100/50 dark:bg-accent-900/50 px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-secondary-100 border-b border-secondary-200 dark:border-secondary-800">
                        Time
                    </th>
                    <th v-for="(day, index) in weekDays" :key="day"
                        class="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-secondary-100 border-b border-secondary-200 dark:border-secondary-800 bg-accent-100/50 dark:bg-accent-900/50">
                        {{ day }}
                        <div class="text-xs text-secondary-600 dark:text-secondary-400">
                            {{ new Date(getFormattedDate(index + 1)).toLocaleDateString('de-DE', {
                                day: '2-digit', month:
                                    '2-digit'
                            }) }}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="timeSlot in timeSlots" :key="timeSlot.start">
                    <td
                        class="sticky left-0 z-10 bg-secondary-100 dark:bg-primary-950 px-6 py-4 text-sm font-medium text-secondary-900 dark:text-secondary-100 border-b border-secondary-200 dark:border-secondary-800">
                        {{ timeSlot.start }} - {{ timeSlot.end }}
                    </td>
                    <td v-for="(day, index) in weekDays" :key="day"
                        class="px-3 py-2 border-b border-secondary-200 dark:border-secondary-800 align-top">
                        <div v-if="getLessonForTimeAndDay(timeSlot.start, index)"
                            class="rounded-lg bg-primary-50 dark:bg-primary-950 p-3 shadow-sm transition-all hover:shadow-md ring-1 ring-primary-100 dark:ring-primary-900">
                            <div class="font-medium text-primary-900 dark:text-primary-100 mb-2">
                                {{ getLessonForTimeAndDay(timeSlot.start, index)?.description }}
                            </div>
                            <div class="space-y-1">
                                <div class="text-sm text-primary-700 dark:text-primary-300">
                                    {{ getLessonForTimeAndDay(timeSlot.start, index)?.instructor }}
                                </div>
                                <div class="text-sm text-primary-600 dark:text-primary-400">
                                    {{ getLessonForTimeAndDay(timeSlot.start, index)?.room }}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="sticky left-0 z-10 bg-secondary-100 dark:bg-primary-950 px-6 py-4">Mensa:</td>
                    <td v-for="(day, index) in weekDays" :key="day"
                        class="px-3 py-2 border-b border-secondary-200 dark:border-secondary-800 align-top">
                        <div v-if="hasLessonsForDay(index)"
                            class="h-16 rounded-lg bg-secondary-200 dark:bg-secondary-800 p-3 opacity-25 flex items-center justify-center text-secondary-600 dark:text-secondary-400">
                            {{ }} <!-- Mensa meal of the day should go here -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import type { CampusDataSimple } from "../composables/useTypes"

const props = defineProps({
    lessons: {
        type: Array as PropType<CampusDataSimple[]>,
        required: true
    }
});

const { getMeals } = useMensa()
const { parseCalendarDate } = useCalendarDate();
const selectedDate: Ref<Date> = useState("selected-date")

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
    { start: '08:00', end: '09:30' },
    { start: '10:00', end: '11:30' },
    { start: '12:00', end: '13:30' },
    { start: '14:00', end: '15:30' },
    { start: '15:45', end: '17:15' },

];

const timestamp: Ref<number> = computed(() => {
    if (selectedDate.value) {
        return selectedDate.value.getTime() / 1000;
    } else {
        return Math.floor((new Date()).getTime() / 1000);
    }
});

const getLessonForTimeAndDay = (startTime: string, dayIndex: number) => {
    const date = new Date(timestamp.value * 1000);
    date.setDate(date.getDate() - date.getDay() + 1 + dayIndex); // Get to the correct weekday

    return props.lessons.find((lesson) =>
        lesson.start === startTime &&
        new Date(lesson.timestamp * 1000).getDay() === date.getDay()
    );
};

const isSameDay = (timestamp1: number, timestamp2: number) => {
    const date1 = new Date(timestamp1 * 1000);
    const date2 = new Date(timestamp2 * 1000);
    return date1.toDateString() === date2.toDateString();
};

// Add new function to check if a day has any lessons
const hasLessonsForDay = (dayIndex: number) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - date.getDay() + 1);
    date.setDate(date.getDate() + dayIndex);

    return props.lessons.some(lesson => isSameDay(lesson.timestamp, timestamp.value));
};

// Add to script setup section
const getFormattedDate = (dayIndex: number) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    // Set to Monday of current week
    date.setDate(date.getDate() - date.getDay() + 1);
    // Add days to get to desired weekday
    date.setDate(date.getDate() + dayIndex);

    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};
</script>

<style scoped>
@media (max-width: 1000px) {
    table {
        min-width: 400px;
    }
}
</style>
