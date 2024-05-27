export const generateTree = ({ folders, files }) => {
	const folderMap = {};
	const fileMap = {};

	folders.forEach((folder) => {
		folderMap[folder.id] = { ...folder, subfolders: [], files: [] };
	});

	files.forEach((file) => {
		if (!fileMap[file.parentId]) {
			fileMap[file.parentId] = [];
		}
		fileMap[file.parentId].push(file);
	});

	folders.forEach((folder) => {
		if (folder.parentId && folderMap[folder.parentId]) {
			folderMap[folder.parentId].subfolders.push(folderMap[folder.id]);
		}
	});

	Object.keys(fileMap).forEach((parentId) => {
		if (folderMap[parentId]) {
			folderMap[parentId].files = fileMap[parentId];
		}
	});

	const rootFolders = folders.filter((folder) => !folder.parentId);

	return rootFolders.map((folder) => folderMap[folder.id]);
};
