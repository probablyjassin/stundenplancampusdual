<template>
    <div>
        <span class="flex">
            <p>Hi! Der Stundenplan ist hier drüben</p>
            <UIcon name="i-heroicons-arrow-up-left" />
        </span>
        <p>Hier kommen vielleicht noch andere Infos hin, sofern campusdual es supported.</p>
        <!-- https://selfservice.campus-dual.de/dash/getexamstats?user=5002669&hash=11fd3cf6e9aaa96ee227e969abb03d06 -->
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'dash'
});
</script>