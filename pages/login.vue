<template>
    <p class="text-3xl">Login</p>
    <p>Benutzername: Matrikelnummer (500xxx)</p>
    <div>
        <p>Passwort: Hash von der Campus-Dual API</p> 
        <NuxtLink to="/hash" class="text-blue-400 underline">(Wie bekomme ich den?)</NuxtLink>
    </div>
    <div class="flex flex-col space-y-5">
        <input type="text" name="username" id="username" placeholder="Username" v-model="username">
        <input type="password" name="Hash" id="hash" placeholder="Passwort (Hash)" v-model="password">
        <button @click="login()" class="p-5 bg-pink-600">Login</button>
    </div>
    <NuxtLink to="/">Home</NuxtLink>
</template>

<script setup>
    const username = ref("")
    const password = ref("")

    const usernameCookie = useCookie("username")
    const passwordCookie = useCookie("password")

    async function login() {
        const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`
        const response = await $fetch(test_url)
        
        if (response == 0) {
            usernameCookie.value = username.value
            passwordCookie.value = password.value
            return console.log("yayy")
        }
        return console.log("no")
    }
</script>