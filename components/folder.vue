<script setup lang="ts">
import { FolderIcon, DocumentTextIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { writeBatch, doc, collection, deleteDoc, query, where, getDoc, getDocs } from 'firebase/firestore';
import { deleteObject, ref as storageRef } from 'firebase/storage';

defineProps({
  folder: Object,
  index: Number,
  handleSelectFolder: Function,
});

const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()
const store = useFileTreeStore();

const emit = defineEmits(['delete-folder']);

async function gatherIdsToDelete(folder: any) {
  let filesToDelete = folder.files.map(file => file.id);
  let foldersToDelete = [folder.id];

  for (const subfolder of folder.subfolders) {
    const subfolderIds = await gatherIdsToDelete(subfolder);
    filesToDelete = filesToDelete.concat(subfolderIds.files);
    foldersToDelete = foldersToDelete.concat(subfolderIds.folders);
  }

  return {
    files: filesToDelete,
    folders: foldersToDelete
  };
}

async function handleDeleteFolder(folder: any) {
  if (!user.value) return;
  emit('delete-folder');

  const idsToDelete = await gatherIdsToDelete(folder);

  for (const fileId of idsToDelete.files) {
    try {
      await handleDeleteFile(fileId);
      console.log('File successfully deleted!', fileId);
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }

  try {
    const batch = writeBatch(db);

    for (const folderId of idsToDelete.folders) {
      const folderToDeleteRef = doc(collection(db, 'users', user.value.uid, 'folders'), folderId);
      batch.delete(folderToDeleteRef);
    }

    await batch.commit();
    console.log('Folders successfully deleted in batch!');
  } catch (error) {
    console.error('Error deleting folders in batch:', error);
  }
}

async function handleDeleteFile(id: String) {
  if (!user.value) return;
  const fileContentRef = storageRef(storage, `${user.value.uid}/${id}`);
  console.log('Deleting file content...', id);
  await deleteObject(fileContentRef).then(async () => {
    console.log('File content successfully deleted!');
    if (!user.value) return;
    const documentToDelete = doc(collection(db, 'users', user.value.uid, 'files'), id)

    console.log('Deleting document...');
    await deleteDoc(documentToDelete).then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }).catch((error) => {
    console.error('Error removing file content: ', error);
  });

}
</script>

<template>
  <div @click.stop>
    <div v-for="subfolder in folder.subfolders" :key="subfolder.id" @click="handleSelectFolder(subfolder, index)">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button variant="ghost" size="xs" class="w-full rounded-md h-7 max-h-7 mb-1"
            :class="{ 'bg-accent': store.path.slice(1).at(index) === subfolder.name }">
            <div class="flex flex-row items-center justify-start w-full">
              <FolderIcon class="size-4" />
              <div class="pl-2 text-xs flex-grow text-start">{{ subfolder.name }}</div>
              <ChevronRightIcon class="size-3" />
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent class="bg-background border-altborder">
          <ContextMenuItem @click="handleDeleteFolder(subfolder)">Delete Folder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

    </div>
    <div v-for="file in folder.files" :key="file.id" @click="navigateTo(`/document/${file.id}`)">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button variant="ghost" size="xs" class="w-full rounded-md hover:underline h-7 max-h-7 mb-1">
            <div class="flex flex-row items-center justify-start w-full">
              <DocumentTextIcon class="size-4" />
              <div class="pl-2 text-xs">{{ file.name }}</div>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent class="bg-background border-altborder">
          <ContextMenuItem @click="handleDeleteFile(file.id)">Delete File</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>
