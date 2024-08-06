<script setup lang="ts">
import { FolderIcon, DocumentTextIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

defineProps({
  folder: Object,
  index: Number,
  handleSelectFolder: Function,
});

const emit = defineEmits(['delete-folder']);

const client = useSupabaseClient()
const ftStore = useFileTreeStore();

async function handleDeleteFolder(folder: any) {
  try {
    await client.from('inodes').delete().eq('path', folder.path);
  } catch (error) {
    console.error('Error deleting folder: ', error);
  }
}

async function handleDeleteFile(path: String) {
  try {
    await client.from('inodes').delete().eq('path', path);
  } catch (error) {
    console.error('Error deleting file: ', error);
  }
}

async function handleOpenDocument(file: any) {
  const displayPath = file.id.split('/').slice(1).join('/');
  navigateTo(`/document/${displayPath}`);
}
</script>

<template>
  <div @click.stop>
    <div v-for="subfolder in folder.subfolders" :key="subfolder.id" @click="handleSelectFolder(subfolder, index)">
      <ContextMenu>
        <ContextMenuTrigger>
          <Button variant="ghost" size="xs" class="w-full rounded-md h-7 max-h-7 mb-1"
            :class="{ 'bg-accent': ftStore.path.slice(1).at(index) === subfolder.name }">
            <div class="flex flex-row items-center justify-start w-full">
              <FolderIcon class="size-4" />
              <div class="pl-2 text-xs flex-grow text-start">{{ subfolder.name }}</div>
              <ChevronRightIcon class="size-3" />
            </div>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent class="bg-background border-altborder">
          <ContextMenuItem class="text-xs" @click="handleDeleteFolder(subfolder)">Delete Folder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

    </div>
    <div v-for="file in folder.files" :key="file.id" @click="handleOpenDocument(file)">
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
          <ContextMenuItem class="text-xs" @click="handleDeleteFile(file.id)">Delete File</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>
