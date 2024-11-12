export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) return true
	if (to.fullPath !== "/stundenplan") {
		return true
	}

	const username = useCookie("username")
	const password = useCookie("password")
	const isLoggedIn = useState("isLoggedIn", (() => false) as () => boolean)

	if (from.fullPath === "/stundenplan") {
		try {
			const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`
			const response = await $fetch(test_url)
			isLoggedIn.value = !!(response == 0)
			return true
		} catch (error) {
			isLoggedIn.value = false
			return
		}
	}


	if (isLoggedIn.value) return true
	return navigateTo("/login")
})
