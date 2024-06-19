<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useFileTreeStore } from '@/stores/filetree';
import { useCommandPanelStore } from '@/stores/commandpanel';
import { useSubscriptionStore } from '~/stores/subscriptions';

interface Folder {
  id: string;
  name: string;
  path: string;
  subfolders: Folder[];
}

const commandPanelStore = useCommandPanelStore();
const filetreeStore = useFileTreeStore();
const subscriptionStore = useSubscriptionStore();
filetreeStore.$subscribe(() => {
  filetreeStore.saveToLocalStorage();
});
const user = useCurrentUser();
const db = useFirestore();
const tree = ref<Folder[]>([]);
const columns = ref<Folder[]>([]);
const folders = ref<any[]>([]);
const files = ref<any[]>([]);

const loadColumns = (pathArray: string[]) => {
  columns.value = [tree.value[0]];
  let currentLevel = tree.value[0].subfolders;

  pathArray.forEach(segment => {
    const nextFolder = currentLevel.find(folder => folder.name === segment);
    if (nextFolder) {
      currentLevel = nextFolder.subfolders;
      columns.value.push(nextFolder);
    }
  });
};

const handleSelectFolder = (subfolder: Folder, index: number) => {
  filetreeStore.path = filetreeStore.path.slice(0, index + 1).concat(subfolder.name);
  columns.value = columns.value.slice(0, index + 1).concat(subfolder);
};

const handleColumnClick = (index: number) => {
  columns.value = columns.value.slice(0, index + 1);
  filetreeStore.path = filetreeStore.path.slice(0, index + 1);
};

const handleDeleteFolder = (index: number) => {
  columns.value = columns.value.slice(0, index + 1);
  filetreeStore.path = filetreeStore.path.slice(0, index + 1);
}

const updateTree = () => {
  if (folders.value.length || files.value.length) {
    tree.value = generateTree({ folders: folders.value, files: files.value });
    loadColumns(filetreeStore.path.slice(1));
  }
};

onBeforeMount(() => {
  filetreeStore.loadFromLocalStorage();
});

onMounted(() => {
  if (user.value) {
    const foldersQuery = query(collection(db, 'users', user.value.uid, 'folders'));
    subscriptionStore.addSubscription('folders', onSnapshot(foldersQuery, (snapshot) => {
      folders.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateTree();
    }));

    const filesQuery = query(collection(db, 'users', user.value.uid, 'files'));
    subscriptionStore.addSubscription('files', onSnapshot(filesQuery, (snapshot) => {
      files.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateTree();
    }));
  }
});

onBeforeUnmount(() => {
  subscriptionStore.unsubscribe('folders');
  subscriptionStore.unsubscribe('files');
});

function handleNewFile(path: string) {
  filetreeStore.selectedPath = path;
  commandPanelStore.updateCommandPath('create-file');
  commandPanelStore.updateIsCommandOpen(true);
}

function handleNewFolder(path: string) {
  filetreeStore.selectedPath = path;
  commandPanelStore.updateCommandPath('create-folder');
  commandPanelStore.updateIsCommandOpen(true);
}
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
          <ContextMenuItem @select="handleNewFolder(folder.path)">NewFolder</ContextMenuItem>
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
