interface File {
	name: string;
	resourceType: string;
	parent: string;
	path: string;
	content: string;
}

export function useFileTree() {
	const filetree = ref(null);
	const error: Ref<any> = ref(null);
	const loading: Ref<boolean> = ref(false);

	const fetchFileTree = async () => {
		loading.value = true;
		try {
			const { data, error: fetchError } = await useFetch(
				`http://localhost:4321/filetree`,
				{
					$fetch: useRequestFetch(),
					credentials: "include",
				},
			);

			filetree.value = data.value ?? null;
			error.value = fetchError.value;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	return {
		filetree,
		error,
		loading,
		fetchFileTree,
	};
}
