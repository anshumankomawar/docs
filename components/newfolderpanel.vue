<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useCollection } from 'vuefire'
import { collection, query, where, addDoc } from 'firebase/firestore'
import { useFocus } from '@vueuse/core'

const user = useCurrentUser()
const db = useFirestore()
const emit = defineEmits(['close-sheet']);
const tags = ref<string[]>([])
const path = ref<string>("/" + useFileTreeStore().path.slice(1).join('/'))
const name = ref<string>('')
const tagValue = ref<string>('')

const addTag = () => {
  if (!tagValue.value || tagValue.value.trim() === "") return
  tags.value.push(tagValue.value)
  tagValue.value = ''
}

const folderQuery = computed(() => {
  if (!user.value) return null;
  return query(
    collection(db, 'users', user.value.uid, 'folders'),
    where('path', '==', path.value)
  );
});

const folders = useCollection(folderQuery);

const createFolder = async () => {
  if (!user.value || !folders.value) return;
  try {
    const folderData = folders.value[0];
    const folderPath = path.value === "/" ? `/${name.value}` : `${path.value}/${name.value}`;

    await addDoc(collection(db, 'users', user.value.uid, 'folders'), {
      name: name.value,
      children: [],
      parentId: folderData.id,
      path: folderPath,
    }).then(() => {
      console.log('Folder successfully written!');
      emit('close-sheet');
    }).catch((error) => {
      console.error('Error writing document: ', error);
    })

  } catch (e) {
    console.error(e)
  }
}

const nameInput = ref(null);
const { focused } = useFocus(nameInput, { initialValue: true })
</script>

<template>
  <SheetHeader>
    <SheetTitle>Create a New Folder</SheetTitle>
    <SheetDescription>
      This creates a new folder. Just give it a name and pick a location!
    </SheetDescription>

    <Separator class="my-2" />

    <div class="flex flex-col space-y-2 w-full">
      <div class="grid max-w-sm items-center gap-1.5 ">
        <Label for="email">Path</Label>
        <Input id="path" v-model="path" type="email" placeholder="/" />
      </div>
      <div class=" grid w-full max-w-sm items-center gap-1.5">
        <Label for="email">Folder Name</Label>
        <Input id="name" type="email" placeholder="Untitled" v-model="name" ref="nameInput" />
      </div>
    </div>
    <Label for="email" class="pt-8">Description</Label>
    <Textarea placeholder="Write a detailed description" />
    <div class=" grid w-full max-w-sm items-center gap-1.5 pt-8">
      <Label for="email">Tags</Label>
      <Input class="w-full " type="text" placeholder="Add a tag" @keydown.enter="addTag" v-model="tagValue" />
    </div>
    <div class="rounded-md overflow-x-scroll w-full items-start justify-start">
      <div class="flex flex-wrap gap-2">
        <span v-for="(tag, index) in tags" :key="index"
          class="bg-accent px-2 py-1 rounded text-xs w-max flex items-center justify-center">
          {{ tag }}
          <XMarkIcon class="w-2 h-2 ml-1 hover:cursor-pointer" @click="tags.splice(index, 1)" />
        </span>
      </div>
    </div>
    <Button class="mt-4" @click="createFolder">Create Folder</Button>
  </SheetHeader>
</template>
