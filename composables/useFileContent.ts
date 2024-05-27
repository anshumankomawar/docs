import { ref } from "vue";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

export const useFileContent = () => {
	const fileContent = ref<string | null>(null);
	const loading = ref<boolean>(false);
	const error = ref<string | null>(null);

	const fetchFileContent = async (filePath: string) => {
		loading.value = true;
		error.value = null;

		try {
			const storage = useFirebaseStorage();
			const fileRef = storageRef(storage, filePath);
			const url = await getDownloadURL(fileRef);

			const response = await fetch(url);
			const blob = await response.blob();
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const text = await blob.text();
			fileContent.value = text;
		} catch (err) {
			error.value = (err as Error).message;
		} finally {
			loading.value = false;
		}
	};

	return {
		fileContent,
		loading,
		error,
		fetchFileContent,
	};
};
