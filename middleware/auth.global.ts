export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.client) return;
	const isLoggedIn = useCookie("Session").value === "valid";

	if (!isLoggedIn && to.path !== "/login") {
		return navigateTo({ path: "/login" });
	} else if (isLoggedIn && (to.path === "/login" || to.path === "/register")) {
		return navigateTo({ path: "/" });
	}
});
