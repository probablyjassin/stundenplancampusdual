<template>
    <div class="w-full h-full ">
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th v-for="day in weekDays" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="timeSlot in timeSlots" :key="timeSlot.start">
                    <td class="time-cell">{{ timeSlot.start }} - {{ timeSlot.end }}</td>
                    <td v-for="(day, index) in weekDays" :key="day" class="lesson-cell">
                        <div v-if="getLessonForTimeAndDay(timeSlot.start, index)" class="lesson">
                            <div class="lesson-title">{{ getLessonForTimeAndDay(timeSlot.start, index).description }}
                            </div>
                            <div class="lesson-details">
                                <div>{{ getLessonForTimeAndDay(timeSlot.start, index).instructor }}</div>
                                <div>{{ getLessonForTimeAndDay(timeSlot.start, index).room }}</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
const props = defineProps({
    lessons: {
        type: Array,
        required: true
    }
});

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = [
    { start: '08:00', end: '09:30' },
    { start: '10:00', end: '11:30' },
    { start: '12:00', end: '13:30' },
    { start: '14:00', end: '15:30' },
    { start: '15:45', end: '17:15' },

];

const getLessonForTimeAndDay = (startTime, dayIndex) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    // Set to Monday of current week
    date.setDate(date.getDate() - date.getDay() + 1);
    // Add days to get to desired weekday
    date.setDate(date.getDate() + dayIndex);

    const timestamp = Math.floor(date.getTime() / 1000);

    return props.lessons.find(lesson =>
        lesson.start === startTime &&
        isSameDay(lesson.timestamp, timestamp)
    );
};

const isSameDay = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1 * 1000);
    const date2 = new Date(timestamp2 * 1000);
    return date1.toDateString() === date2.toDateString();
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    min-width: 800px;
}

@media (max-width: 768px) {
    table {
        /* Make each column take up most of the viewport width on mobile */
        min-width: 400px;
    }

    .time-cell {
        min-width: 100px;
    }

    .lesson-cell {
        /* Make each day column wide enough to be readable */
        min-width: 280px;
    }
}

/* Rest of your existing styles... */
th,
td {
    padding: 8px;
}

th {
    font-weight: bold;
}

.time-cell {
    width: 120px;
    font-weight: bold;
}

.lesson-cell {
    width: calc((100% - 120px) / 5);
    height: 100px;
    vertical-align: top;
}

.lesson {
    border-radius: 4px;
    padding: 8px;
    height: 100%;
    margin-bottom: 1.5em;
}

.lesson-title {
    font-weight: bold;
    margin-bottom: 4px;
}

.lesson-details {
    font-size: 0.9em;
    color: #666;
}

.lesson-details>div {
    margin-bottom: 2px;
}
</style>
