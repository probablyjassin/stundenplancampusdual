<template>
    <div>
        <UProgress animation="carousel" />
    </div>
</template>

<script setup>
const router = useRouter();

onMounted(() => {
    const isLoggedIn = useState("isLoggedIn");
    const username = useCookie("username", { sameSite: "strict" });
    const password = useCookie("password", { sameSite: "strict" });
    const data = useState("stundenplan");
    const groupedByDay = useState("groupedByDay");
    localStorage.removeItem("stundenplan");
    username.value = "";
    password.value = "";
    data.value = [];
    groupedByDay.value = {};
    isLoggedIn.value = false;
    router.push("/");
});
</script>
