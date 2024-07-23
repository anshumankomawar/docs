<script setup lang="ts">
import { usePathStore } from '@/stores/path';
import { useFileTreeStore } from '@/stores/filetree';

const pathStore = usePathStore();
const filetreeStore = useFileTreeStore();
const isLoading = computed(() => filetreeStore.isLoading);
const columns = computed(() => filetreeStore.columns);
const { handleSelectFolder, handleNewFile, handleNewFolder, handleDeleteFolder, handleColumnClick } = filetreeStore;

pathStore.$subscribe(() => {
  pathStore.saveToLocalStorage();
});

onMounted(async () => {
  await filetreeStore.fetchFileTree();
});

onBeforeMount(() => {
  pathStore.loadFromLocalStorage();
});
</script>

<template>
  <div class="w-full h-full overflow-x-hidden">
    <div class="flex h-full overflow-x-scroll">
      <ContextMenu v-for="(folder, index) in columns" :key="index">
        <ContextMenuTrigger class="border-r min-w-[200px] px-2 pt-2.5" @click="handleColumnClick(index)">
          <Folder :folder="folder" :handleSelectFolder="handleSelectFolder" :index="index"
            @delete-folder="handleDeleteFolder(index)" />
        </ContextMenuTrigger>
        <ContextMenuContent class="bg-background border-altborder">
          <ContextMenuItem @select="handleNewFile(folder.path)">New File</ContextMenuItem>
          <ContextMenuItem @select="handleNewFolder(folder.path)">New Folder</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </div>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

.column-layout {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
</style>
