export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.fullPath == "/stundenplan") {
		return navigateTo("/dash/stundenplan")
	}
	if (import.meta.server) return true


	const isLoggedIn = useState("isLoggedIn", (() => false) as () => boolean)

	if (!to.fullPath.includes("dash")) {
		return true
	}
	const username = useCookie("username")
	const password = useCookie("password")

	if (!isLoggedIn.value) {
		try {
			const test_url = `https://corsproxy.io/?https%3A%2F%2Fselfservice.campus-dual.de%2Fdash%2Fgetcp%3Fuser%3D${username.value}%26hash%3D${password.value}`
			const response = await $fetch(test_url)
			isLoggedIn.value = !!(response == 0)
		} catch (error) {
			isLoggedIn.value = false
		}
	}


	if (isLoggedIn.value) return true
	return navigateTo("/login")
})
