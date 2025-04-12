export default defineNuxtRouteMiddleware((to) => {
    const usernameCookie = useCookie("username");
    const passwordCookie = useCookie("password");
    const publicRoutes = ["/", "/login"];

    if (publicRoutes.includes(to.path)) {
        return;
    }

    if (!usernameCookie.value || !passwordCookie.value) {
        console.log("not logged in");
        return navigateTo("/login");
    }
});
