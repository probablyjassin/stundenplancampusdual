export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.fullPath == "/stundenplan") {
		return navigateTo("/dash/stundenplan");
	}
	if (import.meta.server) return true;

	const { getCampusData } = useCampus();
	const isLoggedIn = useState("isLoggedIn", (() => false) as () => boolean);

	if (!to.fullPath.includes("dash")) {
		return true;
	}

	if (!isLoggedIn.value) {
		try {
			const response = await getCampusData("timeline");
			isLoggedIn.value = !!(typeof response != "string");
		} catch (error) {
			isLoggedIn.value = false;
		}
	}

	if (isLoggedIn.value) return true;
	return navigateTo("/login");
});
