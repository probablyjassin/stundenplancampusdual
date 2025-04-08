export function useMensa() {
    async function getMeals(day: string) {
        return await $fetch(`https://openmensa.org/api/v2/canteens/69/days/${day}/meals`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    return {
        getMeals,
    }
}
