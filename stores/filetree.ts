export const useFileTreeStore = defineStore("filetree", {
	state: () => {
		return {
			path: [useSupabaseUser().value?.id + "/"],
			selectedPath: "",
			selectedInode: {},
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
		resetPath(user_id: string) {
			this.path = [user_id + "/"];
			localStorage.setItem("filetree-path", JSON.stringify(this.path));
		},
	},
});
