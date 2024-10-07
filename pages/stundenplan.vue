<template>
    <div class="container mx-auto p-4">
        <p class="text-3xl font-bold mb-4">Stundenplan</p>
        <p class="text-lg mb-4">{{ new Date(Number(Object.keys(groupedByDay)[page-1])).toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        <div class="mb-4">
            <UPagination v-model="page" :page-count="itemsPerPage" :total="data.length" class="mb-4" />
        </div>
        <UTable :rows="schedule[page-1]" class="w-full" />
    </div>
</template>

<script setup>
    const username = useCookie("username")
    const password = useCookie("password")

    const page = ref(1)
    const itemsPerPage = 10

    const groupedByDay = {}
    const data = ref([])
    const schedule = computed(() => {

        data.value.forEach((item) => {
            const day = new Date(item["start"] * 1000).setHours(0, 0, 0, 0);

            if (!groupedByDay[day]) {
                groupedByDay[day] = []
            }
            groupedByDay[day].push({
                "Kurs": item["description"],
                "Raum": item["sroom"],
                "Dozent": item["sinstructor"],
                "Von": (new Date(item["start"] * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })),
                "Bis": (new Date(item["end"] * 1000).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false })),
                "Bemerkungen": item["remarks"]
            })
        })

        return Object.values(groupedByDay)
    })
    
    onMounted(async() => {
        const response = await $fetch(`https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Froom%2Fjson%3Fuserid%3D${username.value}%26hash%3D${password.value}`)
        data.value = response
    })
</script>