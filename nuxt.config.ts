export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			url: process.env.NUXT_ENV_VERCEL_URL
				? `https://${process.env.NUXT_ENV_VERCEL_URL}`
				: "http://localhost:3000",
		},
	},
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxtjs/supabase",
		"shadcn-nuxt",
		"@nuxtjs/color-mode",
		"@pinia/nuxt",
	],
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},
	supabase: {
		redirect: true,
		redirectOptions: {
			login: "/login",
			callback: "/confirm",
			include: undefined,
			exclude: [],
			cookieRedirect: true,
		},
	},
	colorMode: {
		classSuffix: "",
	},
	pinia: {
		storesDirs: ["./stores/**"],
	},
	compatibilityDate: "2024-07-20",
});
