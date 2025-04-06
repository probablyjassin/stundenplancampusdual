function timestampTo24h(timestamp: number): string {
	const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
	return date.toLocaleTimeString("de-DE", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function useDataTransform() {
	function CampusToSimple(data: CampusData[]) {
		const simpleData: CampusDataSimple[] = data.map((lesson) => {
			return {
				title: lesson.title,
				start: timestampTo24h(lesson.start),
				end: timestampTo24h(lesson.end),
				timestamp: lesson.start,
				description: lesson.description,
				instructor: lesson.sinstructor,
				room: lesson.sroom,
			};
		});
		const weeks: { [key: number]: CampusDataSimple[] } = {};
		simpleData.forEach((lesson) => {
			const week = timestampToMonday(lesson.timestamp);
			if (!weeks[week]) {
				weeks[week] = [];
			}
			weeks[week].push(lesson);
		});
		return weeks;
	}

	function timestampToMonday(timestamp: number): number {
		const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
		const day = date.getDay(); // Get the current day (0-6, where 0 is Sunday)
		const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday
		date.setDate(diff);
		// Set time to start of day
		date.setHours(0, 0, 0, 0);
		return Math.floor(date.getTime() / 1000); // Convert back to Unix timestamp
	}

	return {
		CampusToSimple,
		timestampToMonday,
		//groupByWeekday,
	};
}
