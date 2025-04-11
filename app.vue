<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
            <UButton
                class="fixed bottom-4 right-4"
                icon="mdi:help-circle"
            ></UButton>
        </NuxtLayout>
    </UApp>
</template>

<script setup>
useHead({
    title: "Stundenplan",
    meta: [
        {
            name: "description",
            content:
                "Einfache, mobile-first WebApp für den CampusDual-Stundenplan. Support für Firefox und Chromium.",
        },
    ],
});

const { getCampusData } = useCampus();

const username = useCookie("username");
const password = useCookie("password");
const isLoggedIn = useState("isLoggedIn", () => false);

onMounted(async () => {
    try {
        const response = await getCampusData("credits");
        isLoggedIn.value = !!(typeof response === "number");
    } catch (error) {
        isLoggedIn.value = false;
    }
});
</script>
