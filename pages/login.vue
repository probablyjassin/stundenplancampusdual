<template>
    <p>Login</p>
    <input type="password" name="Hash" id="hash" v-model="password">
    <button @click="console.log(password)">Login</button>
    <NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
    const password = ref("")
</script>