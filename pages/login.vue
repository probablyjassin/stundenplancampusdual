<template>
    <p>Login</p>
    <input type="text" name="username" id="username" v-model="username">
    <input type="password" name="Hash" id="hash" v-model="password">
    <button @click="login()">Login</button>
    <NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
    const username = ref("")
    const password = ref("")

    async function login() {
        const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`
        const response = await $fetch(test_url)
        
        if (response == 0) {
            return console.log("yayy")
        }
        return console.log("no")
    }
</script>