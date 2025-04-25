export function useSchedule() {
	const { getCampusData } = useCampus();

	const pending = useState("pending", () => true)

	const schedule = useState("stundenplan", () => {
		// Initialize from localStorage if available
		if (import.meta.client) {
			const stored = localStorage.getItem("stundenplan");
			return stored ? JSON.parse(stored) : null;
		}
	});

	// Fetch fresh data and update if needed
	const refresh = async () => {
		try {
			const fresh = await getCampusData("room");
			if (fresh && JSON.stringify(fresh) !== JSON.stringify(schedule.value)) {
				schedule.value = fresh;
				localStorage.setItem("stundenplan", JSON.stringify(fresh));
			}
		} catch (error) {
			console.error("Failed to fetch schedule:", error);
			return navigateTo("/");
		}
	};

	return {
		schedule,
		pending,
		refresh,
	};
}
