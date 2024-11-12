export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) return true
	if (to.fullPath !== "/stundenplan") {
		return true
	}
	const isLoggedIn = useState("isLoggedIn", (() => false) as () => boolean)

	if (isLoggedIn.value) return true
	return navigateTo("/login")
})
