<template>
    <div>
        <p>stundenplan yayyy:</p>
        <p>{{data}}</p>
    </div>
</template>

<script setup>
    const username = useCookie("username")
    const password = useCookie("password")
    const data = ref([])

    onMounted(async() => {
        const response = await $fetch(`https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Froom%2Fjson%3Fuserid%3D${username.value}%26hash%3D${password.value}`)
        data.value = response
    })
</script>