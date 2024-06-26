export const useFileTreeStore = defineStore("filetree", {
	state: () => {
		return {
			path: ["Home"],
			selectedPath: "",
		};
	},
	actions: {
		loadFromLocalStorage() {
			const storedPath = localStorage.getItem("filetree-path");
			if (storedPath) {
				this.path = JSON.parse(storedPath);
			}
		},
		saveToLocalStorage() {
			localStorage.setItem("filetree-path", JSON.stringify(this.path));
		},
	},
});
