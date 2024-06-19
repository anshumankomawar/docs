import { ref } from "vue";
import { doc, collection, updateDoc, setDoc, getDoc } from "firebase/firestore";

export const useFileContent = () => {
	const fileContent = ref<string | null>(null);
	const loading = ref<boolean>(false);
	const error = ref<string | null>(null);
	const user = useCurrentUser();
	const db = useFirestore();

	const fetchFileContent = async (userId: string, fileId: string) => {
		loading.value = true;
		error.value = null;

		try {
			const file = await getDoc(
				doc(collection(db, "users", userId, "files"), fileId),
			);

			if (!file.exists()) {
				throw new Error("File not found");
			}

			fileContent.value = file.data().content;
		} catch (err) {
			error.value = (err as Error).message;
		} finally {
			loading.value = false;
		}
	};

	const saveFileContent = (fileId: string, content: string) => {
		updateDoc(doc(collection(db, "users", user.value!.uid, "files"), fileId), {
			content: content,
		});
	};

	return {
		fileContent,
		loading,
		error,
		fetchFileContent,
		saveFileContent,
	};
};
