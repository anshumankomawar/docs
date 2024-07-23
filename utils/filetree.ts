export const generateTree = ({ folders, files }) => {
	const folderMap = {};
	const fileMap = {};

	folders.forEach((folder) => {
		folderMap[folder.path] = { ...folder, subfolders: [], files: [] };
	});

	files.forEach((file) => {
		if (!fileMap[file.parent]) {
			fileMap[file.parent] = [];
		}
		fileMap[file.parent].push(file);
	});

	folders.forEach((folder) => {
		if (folder.parent && folderMap[folder.parent]) {
			folderMap[folder.parent].subfolders.push(folderMap[folder.path]);
		}
	});

	Object.keys(fileMap).forEach((parentId) => {
		if (folderMap[parentId]) {
			folderMap[parentId].files = fileMap[parentId];
		}
	});

	const rootFolders = folders.filter((folder) => !folder.parentId);

	return rootFolders.map((folder) => folderMap[folder.path]);
};
