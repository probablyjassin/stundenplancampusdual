<template>
    <div>
        <UHorizontalNavigation :links='[
            [{
                label: "Home",
                icon: "i-heroicons-home",
                to: "/",
            },
            {
                label: "Wie finde ich mein Passwort (Hash)?",
                icon: "i-heroicons-document-text",
                to: "/hash",
            }], [
                {
                    label: "Login",
                    icon: "i-heroicons-finger-print",
                    to: "/login",
                }],
        ]' class="border-b border-gray-200 dark:border-gray-800" />
        <slot />
    </div>
</template>
