<template>
    <div class="mx-auto p-4">
        <h1 class="text-3xl">
            Semester: <b>{{ semester }}</b>
        </h1>
        <p>
            <b>{{ credits }}</b> Credit-Points
        </p>
        <br>
        <p>Prüfungen: (WIP)</p>
        <p>
            {{ exams }}
        </p>
    </div>
</template>

<script setup>
    definePageMeta({
        layout: 'dash'
    });

    const { getCampusData } = useCampus()

    const semester = ref(await getCampusData("semester"))
    const credits = ref(await getCampusData("credits"))
    const exams = ref(await getCampusData("exams"))
</script>