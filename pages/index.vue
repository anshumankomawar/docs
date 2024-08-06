<script setup lang="ts">
import type { RealtimeChannel } from '@supabase/supabase-js'
import { useFileTreeStore } from '@/stores/filetree';
import { useCommandPanelStore } from '@/stores/commandpanel';

interface Folder {
  id: string;
  name: string;
  path: string;
  subfolders: Folder[];
}

interface Inode {
  path: string
  name: string
  parent_path: string | null
  resource_type: 'file' | 'folder'
  content: string | null
  created_at: string
  updated_at: string
}

interface TransformedInode {
  id: string
  path: string
  parentId: string | null
  name: string
  subfolders: TransformedInode[]
  files: TransformedInode[]
  children: TransformedInode[]
  content?: string
  createdAt: string
  updatedAt: string
}

let realtimeChannel: RealtimeChannel | undefined

const commandPanelStore = useCommandPanelStore();
const filetreeStore = useFileTreeStore();
const client = useSupabaseClient()

const transformData = (data: Inode[]): TransformedInode[] => {
  const map = new Map<string, TransformedInode>()

  data.forEach(item => {
    const transformedItem: TransformedInode = {
      id: item.path,
      path: item.path,
      parentId: item.parent_path,
      name: item.name,
      subfolders: [],
      files: [],
      children: [],
      content: item.content || '',
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }
    map.set(item.path, transformedItem)
  })

  const result: TransformedInode[] = []

  data.forEach(item => {
    const transformedItem = map.get(item.path)
    if (!transformedItem) return

    if (item.parent_path) {
      const parent = map.get(item.parent_path)
      if (parent) {
        if (item.resource_type === 'folder') {
          parent.subfolders.push(transformedItem)
        } else if (item.resource_type === 'file') {
          parent.files.push(transformedItem)
        }
      }
    } else {
      result.push(transformedItem)
    }
  })

  return result
}

let { data: fetchedData, refresh: refreshFilesAndFolders } = await useAsyncData('filesAndFolders', async () => {
  const { data, error } = await client
    .from('inodes')
    .select('*')

  const transformedData = transformData(data as Inode[])
  let pathArray = filetreeStore.path.slice(0);
  let tempColumns = [transformedData[0]];
  let currentLevel = transformedData[0].subfolders;

  pathArray.forEach(segment => {
    const nextFolder = currentLevel.find(folder => folder.name === segment);
    if (nextFolder) {
      currentLevel = nextFolder.subfolders;
      tempColumns.push(nextFolder);
    }
  });

  return tempColumns;
})

const handleSelectFolder = (subfolder: Folder, index: number) => {
  filetreeStore.path = filetreeStore.path.slice(0, index + 1).concat(subfolder.name);
  fetchedData.value = fetchedData.value.slice(0, index + 1).concat(subfolder);
};

const handleColumnClick = (index: number) => {
  fetchedData.value = fetchedData.value.slice(0, index + 1);
  filetreeStore.path = filetreeStore.path.slice(0, index + 1);
};

const handleDeleteFolder = (index: number) => {
  fetchedData.value = fetchedData.value.slice(0, index + 1);
  filetreeStore.path = filetreeStore.path.slice(0, index + 1);
}

function handleNewFile(folder: Folder) {
  filetreeStore.selectedPath = folder.path;
  filetreeStore.selectedInode = folder;
  commandPanelStore.updateCommandPath('create-file');
  commandPanelStore.updateIsCommandOpen(true);
}

function handleNewFolder(path: string) {
  filetreeStore.selectedPath = path;
  commandPanelStore.updateCommandPath('create-folder');
  commandPanelStore.updateIsCommandOpen(true);
}

onMounted(() => {
  realtimeChannel = client.channel('public:inodes').on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'inodes' },
    () => refreshFilesAndFolders()
  )

  realtimeChannel.subscribe()
  console.log('Subscribed to realtime changes')
})

onUnmounted(() => {
  if (realtimeChannel)
    client.removeChannel(realtimeChannel)
})
</script>

<template>
  <div class="w-full h-full overflow-x-hidden">
    <div class="flex h-full overflow-x-scroll">
      <ContextMenu v-for="(folder, index) in fetchedData" :key="index">
        <ContextMenuTrigger class="border-r min-w-[200px] px-2 pt-2.5" @click="handleColumnClick(index)">
          <Inode :folder="folder" :handleSelectFolder="handleSelectFolder" :index="index"
            @delete-folder="handleDeleteFolder(index)" />
        </ContextMenuTrigger>
        <ContextMenuContent class="bg-background border-altborder ">
          <ContextMenuItem class="text-xs" @select="handleNewFile(folder)">New File</ContextMenuItem>
          <ContextMenuItem class="text-xs" @select="handleNewFolder(folder.path)">NewFolder</ContextMenuItem>
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
