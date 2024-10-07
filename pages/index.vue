<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-col space-y-5">
            <p class="text-4xl text-primary font-semibold mb-2">Stundenplan für CampusDual</p>
            <p>
                Eine simple WebApp, nur für den Stundenplan von CampusDual. <br>
                Mit einem Design, dass auf Mobile auch tatsächlich nutzbar ist.
            </p>
            <p>
                Die Seite ist in NuxtJS mit TailwindCSS geschrieben. <br>
                Anders als auf CampusDual, werden die Daten nur einmal gefetched; <br>
                zwischen Tagen und Wochen wechseln dauert also keine 5 Sekunden!
            </p>
            <a class="text-accent underline" href="https://github.com/probablyjassin/studenplancampusdual">Zum Github-Repo</a>
        </div>
    </div>
</template>

<script setup>
</script>