export function useSchedule() {
	const { getCampusData } = useCampus();

	const schedule = useState("stundenplan", () => {
		// Initialize from localStorage if available
		if (import.meta.client) {
			const stored = localStorage.getItem("stundenplan");
			return stored ? JSON.parse(stored) : null;
		}
	});
	const pending = ref(false);

	// Fetch fresh data and update if needed
	const refresh = async () => {
		pending.value = true;
		try {
			const fresh = await getCampusData("room");
			if (fresh && JSON.stringify(fresh) !== JSON.stringify(schedule.value)) {
				schedule.value = fresh;
				localStorage.setItem("stundenplan", JSON.stringify(fresh));
			}
		} catch (error) {
			console.error("Failed to fetch schedule:", error);
			return navigateTo("/");
		} finally {
			pending.value = false;
		}
	};

	return {
		schedule,
		pending,
		refresh,
	};
}
