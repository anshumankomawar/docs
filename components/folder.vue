<script setup lang="ts">
import { FolderIcon, DocumentTextIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { doc, collection, deleteDoc } from 'firebase/firestore';

defineProps({
  folder: Object,
  index: Number,
  handleSelectFolder: Function,
});

const user = useCurrentUser()
const db = useFirestore()
const store = useFileTreeStore();

async function handleDeleteFolder(id: String) {
  if (!user.value) return;
  const documentToDelete = doc(collection(db, 'users', user.value.uid, 'folders'), id)
  await deleteDoc(documentToDelete).then(() => {
    console.log('Document successfully deleted!');
  }).catch((error) => {
    console.error('Error removing document: ', error);
  });
}

async function handleDeleteFile(id: String) {
  if (!user.value) return;
  const documentToDelete = doc(collection(db, 'users', user.value.uid, 'files'), id)
  await deleteDoc(documentToDelete).then(() => {
    console.log('Document successfully deleted!');
  }).catch((error) => {
    console.error('Error removing document: ', error);
  });
}
</script>

<template>
  <div @click.stop>
    <div v-for="subfolder in folder.subfolders" :key="subfolder.id" @click="handleSelectFolder(subfolder, index)">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button variant="ghost" size="xs" class="w-full rounded-md"
            :class="{ 'bg-accent': store.path.slice(1).at(index) === subfolder.name }">
            <div class="flex flex-row items-center justify-start w-full">
              <FolderIcon class="size-4" />
              <div class="pl-2 text-xs flex-grow text-start">{{ subfolder.name }}</div>
              <ChevronRightIcon class="size-3" />
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem @click="handleDeleteFolder(subfolder.id)">Delete Folder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

    </div>
    <div v-for="file in folder.files" :key="file.id" @click="navigateTo(`/document/${file.id}`)">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button variant="ghost" size="xs" class="w-full rounded-md hover:underline">
            <div class="flex flex-row items-center justify-start w-full">
              <DocumentTextIcon class="size-4" />
              <div class="pl-2 text-xs">{{ file.name }}</div>
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem @click="handleDeleteFile(file.id)">Delete File</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>
