<template>
    <div>
        <UHorizontalNavigation :links='[
            [{
                label: "Dashboard",
                icon: "i-heroicons-home",
                to: "/dash",
            },
            {
                label: "Stundenplan",
                icon: "i-heroicons-clock",
                to: "/dash/stundenplan",
            }], [
                {
                    label: "Logout",
                    icon: "i-heroicons-arrow-turn-down-left",
                    to: "/logout",
                }],
        ]' class="border-b border-gray-200 dark:border-gray-800" />
        <slot />
    </div>
</template>
