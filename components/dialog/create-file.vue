<script setup lang="ts">
import { ChevronLeftIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import { collection, query, where, addDoc } from 'firebase/firestore'
import { useFocus } from '@vueuse/core'
import { ref as storageRef, uploadString } from 'firebase/storage'


const emits = defineEmits(['created-file', 'back-clicked'])
const user = useCurrentUser()
const db = useFirestore()
const storage = useFirebaseStorage()
const tags = ref([])
const path = ref<string>("/" + useFileTreeStore().path.slice(1).join('/'))
const name = ref<string>('')

const folderQuery = computed(() => {
  if (!user.value) return null;
  return query(
    collection(db, 'users', user.value.uid, 'folders'),
    where('path', '==', path.value)
  );
});

const folders = useCollection(folderQuery);

const createFile = async () => {
  if (!user.value) return;
  try {
    const folderData = folders.value[0];
    const docRef = await addDoc(collection(db, 'users', user.value.uid, 'files'), {
      name: name.value,
      parentId: folderData.id,
      path: `${path.value}/${name.value}`,
    });

    const newFileRef = storageRef(storage, `${user.value.uid}/${docRef.id}`);
    await uploadString(newFileRef, '<h1>Hello World</h1>');
    emits('created-file');
    console.log('Finished creating file...');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
}

const filenameInput = ref(null);
useFocus(filenameInput, { initialValue: true })
</script>

<template>
  <DialogHeader class="text-xs w-full flex flex-row items-center px-2">
    <ChevronLeftIcon class="size-4 mr-1 my-1 p-0.5 stroke-alttext hover:bg-accent rounded-md hover:cursor-pointer"
      @click="$emit(`back-clicked`)" />
    <div class="mr-1 text-alttext">Quick actions /</div>
    <DocumentIcon class="size-3 mr-0.5" />
    <div>Create File</div>
  </DialogHeader>
  <Separator class="bg-altborder my-2" />
  <div class="px-2 space-y-4 overflow-y-scroll">
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Path</Label>
      <Input id="path" class="border-altborder bg-background" v-model="path" type="email" placeholder="/" />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">File Name</Label>
      <Input ref="filenameInput" id="path" class="border-altborder bg-background" v-model="name" type="email"
        placeholder="Untitled" />
    </div>
    <div>
      <Label for="email" class="text-xs ml-1">Description</Label>
      <Textarea class="bg-background border-altborder" placeholder="Write a detailed description" />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Tags</Label>
      <TagsInput v-model="tags">
        <TagsInputItem v-for="item in tags" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="Tags..." />
      </TagsInput>
    </div>
    <Button class="w-full bg-violet-700 hover:bg-violet-600 text-white" variant="default" @click="createFile">Create
      File</Button>
  </div>
</template>
