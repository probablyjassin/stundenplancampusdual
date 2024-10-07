<template>
    <div>
        <p>hello world</p>
        <button @click="isOpen=true">Open Slideover</button>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/stundenplan">Zum Stundenplan</NuxtLink>
    </div>
</template>

<script setup>
    const isOpen = useState("isSlideOverMenuOpen", (() => false))
</script>