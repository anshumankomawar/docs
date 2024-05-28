<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useFileTreeStore } from '@/stores/filetree';

interface Folder {
  id: string;
  name: string;
  subfolders: Folder[];
}

const route = useRoute();
const router = useRouter();
const store = useFileTreeStore();
store.$subscribe(() => {
  store.saveToLocalStorage();
});
const user = useCurrentUser();
const db = useFirestore();
const tree = ref<Folder[]>([]);
const columns = ref<Folder[]>([]);
const folders = ref<Folder[]>([]);
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
  store.path = store.path.slice(0, index + 1).concat(subfolder.name);
  columns.value = columns.value.slice(0, index + 1).concat(subfolder);
};

const handleColumnClick = (index: number) => {
  columns.value = columns.value.slice(0, index + 1);
  store.path = store.path.slice(0, index + 1);
};

const handleDeleteFolder = (index: number) => {
  columns.value = columns.value.slice(0, index + 1);
  store.path = store.path.slice(0, index + 1);
}

let unsubscribeFolders: (() => void) | null = null;
let unsubscribeFiles: (() => void) | null = null;

const updateTree = () => {
  if (folders.value.length || files.value.length) {
    tree.value = generateTree({ folders: folders.value, files: files.value });
    loadColumns(store.path.slice(1));
  }
};

onBeforeMount(() => {
  store.loadFromLocalStorage();
});

onMounted(() => {
  console.log(store.path)
  if (user.value) {
    const foldersQuery = query(collection(db, 'users', user.value.uid, 'folders'));
    unsubscribeFolders = onSnapshot(foldersQuery, (snapshot) => {
      folders.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateTree();
    });

    const filesQuery = query(collection(db, 'users', user.value.uid, 'files'));
    unsubscribeFiles = onSnapshot(filesQuery, (snapshot) => {
      files.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      updateTree();
    });
  }
});

onBeforeUnmount(() => {
  if (unsubscribeFolders) unsubscribeFolders();
  if (unsubscribeFiles) unsubscribeFiles();
});
</script>

<template>
  <div class="w-full h-full overflow-x-hidden">
    <div class="flex h-full overflow-x-scroll">
      <div class="border-r min-w-[200px] px-2 pt-2 " v-for="(folder, index) in columns" :key="index"
        @click="handleColumnClick(index)">
        <Folder :folder="folder" :handleSelectFolder="handleSelectFolder" :index="index"
          @delete-folder="handleDeleteFolder(index)" />
      </div>
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
