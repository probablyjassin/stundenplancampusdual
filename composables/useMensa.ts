export function useMensa() {
    function getMeals(day: string) {
        const url = `https://openmensa.org/api/v2/canteens/69/days/${day}/meals`;
        const { data, error } = useFetch<Meal[]>(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return { data, error };
    }
    return {
        getMeals,
    }
}