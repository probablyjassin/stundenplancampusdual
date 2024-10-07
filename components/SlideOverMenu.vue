<template>
    <USlideover v-model="isOpen">
        <div class="p-4 flex-1">
        <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
        />
        <div>
            <p>slideover</p>
        </div>
        </div>
    </USlideover>
</template>

<script setup>
    const isOpen = useState("isSlideOverMenuOpen", (() => false))
</script>