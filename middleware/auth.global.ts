export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await getCurrentUser!();

	if (!user && to.path !== "/login") {
		return navigateTo({ path: "/login" });
	} else if (user && (to.path === "/login" || to.path === "/register")) {
		return navigateTo({ path: "/" });
	}
});
