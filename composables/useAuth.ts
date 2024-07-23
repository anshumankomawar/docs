export function useAuth() {
	const error = ref<string | null>(null);

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const { data, error: loginError } = await useFetch(
				"http://localhost:4321/login",
				{
					method: "POST",
					body: JSON.stringify({ username: email, password: password }),
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include", // Ensure credentials are included
				},
			);

			error.value = null;
		} catch (err) {
			error.value = (err as Error).message;
		}
	};

	const register = async (email: string, password: string): Promise<void> => {
		try {
			const { data, error: registerError } = await useFetch(
				"http://localhost:4321/register",
				{
					method: "POST",
					body: JSON.stringify({ email, password }),
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include", // Ensure credentials are included
				},
			);

			error.value = null;
		} catch (err) {
			error.value = (err as Error).message;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			// Call the logout endpoint on the server
			await useFetch("http://localhost:4321/logout", {
				method: "POST",
				credentials: "include", // Ensure credentials are included
			});
		} catch (err) {
			error.value = (err as Error).message;
		}
	};

	return {
		error,
		login,
		register,
		logout,
	};
}
