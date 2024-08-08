export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			url: process.env.VERCEL_URL,
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
