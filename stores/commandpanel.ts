export const useCommandPanelStore = defineStore("commandpanel", () => {
	const commandPath = ref("");
	const isCommandOpen = ref(false);

	function updateCommandPath(path: string) {
		commandPath.value = path;
	}

	function updateIsCommandOpen(v: boolean) {
		isCommandOpen.value = v;
	}

	return { commandPath, isCommandOpen, updateCommandPath, updateIsCommandOpen };
});
