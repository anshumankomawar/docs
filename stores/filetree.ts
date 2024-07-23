import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export interface File {
	id: string;
	resourceType: string;
	resourceId: string;
	name: string;
	path: string;
	content: string;
	parent: string;
}

export interface Folder {
	id: string;
	resourceType: string;
	resourceId: string;
	name: string;
	path: string;
	files: File[];
	subfolders: Folder[];
}

export const useFileTreeStore = defineStore("filetree", () => {
	const pathStore = usePathStore();
	const commandPanelStore = useCommandPanelStore();
	const isLoading = ref(true);
	const filetree = ref<Folder | null>(null);
	const columns = ref<Folder[]>([]);

	const fetchFileTree = async () => {
		isLoading.value = true;
		try {
			const res = await axios.get("http://localhost:4321/filetree", {
				withCredentials: true,
			});

			if (res.data) {
				console.log(res.data);
				filetree.value = mapToFolder(res.data);
				generateColumns(pathStore.path);
				isLoading.value = false;
			}
		} catch (error) {
			console.error("Error fetching file tree:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const generateColumns = (pathArray: string[]) => {
		if (!filetree.value) return [];

		let gen: Folder[] = [filetree.value];
		let currentLevel = filetree.value.subfolders;

		pathArray.forEach((segment) => {
			const nextFolder = currentLevel.find((folder) => folder.name === segment);
			if (nextFolder) {
				currentLevel = nextFolder.subfolders;
				gen.push(nextFolder);
			}
		});

		columns.value = gen;
	};

	const handleSelectFolder = (subfolder: Folder, index: number) => {
		pathStore.path = pathStore.path.slice(0, index + 1).concat(subfolder.name);
		columns.value = columns.value.slice(0, index + 1).concat(subfolder);
	};

	const handleColumnClick = (index: number) => {
		columns.value = columns.value.slice(0, index + 1);
		pathStore.path = pathStore.path.slice(0, index + 1);
	};

	const handleDeleteFolder = (index: number) => {
		columns.value = columns.value.slice(0, index + 1);
		pathStore.path = pathStore.path.slice(0, index + 1);
	};

	const handleNewFile = (path: string) => {
		pathStore.selectedPath = path;
		commandPanelStore.updateCommandPath("create-file");
		commandPanelStore.updateIsCommandOpen(true);
	};

	const handleNewFolder = (path: string) => {
		pathStore.selectedPath = path;
		commandPanelStore.updateCommandPath("create-folder");
		commandPanelStore.updateIsCommandOpen(true);
	};

	const mapToFolder = (data: any): Folder => {
		return {
			id: data.path,
			resourceType: data.resourceType,
			resourceId: data.resourceId,
			name: data.name,
			path: data.path,
			files: data.files.map((file: any) => ({
				id: file.path,
				resourceType: file.resourceType,
				resourceId: file.resourceId,
				name: file.name,
				path: file.path,
				parent: file.parent,
				content: file.content,
			})),
			subfolders: data.subfolders
				? data.subfolders.map((subfolder: any) => mapToFolder(subfolder))
				: [],
		};
	};

	return {
		isLoading,
		filetree,
		fetchFileTree,
		columns,
		handleSelectFolder,
		handleColumnClick,
		handleDeleteFolder,
		handleNewFile,
		handleNewFolder,
	};
});
