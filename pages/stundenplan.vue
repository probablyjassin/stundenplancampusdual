<template>
    <div>
        <p>stundenplan yayyy:</p>
        <p>{{data}}</p>
    </div>
</template>

<script setup>
    const data = []

    onMounted(async() => {
        const response = await $fetch("")
    })
</script>