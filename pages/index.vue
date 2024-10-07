<template>
    <div>
        <p>hello world</p>
        <button @click="isOpen=true">Open Slideover</button>
    </div>
</template>

<script setup>
    const isOpen = useState("isSlideOverMenuOpen", (() => false))
</script>