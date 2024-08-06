<script setup lang="ts">
import { ChevronLeftIcon, FolderIcon } from '@heroicons/vue/24/outline';
import { useFocus } from '@vueuse/core'

const emit = defineEmits(['created-folder', 'back-clicked']);

const user = useSupabaseUser()
const client = useSupabaseClient()
const fileTreeStore = useFileTreeStore()
const tags = ref([])
const path = ref<string>('')
const name = ref<string>('')

const createFolder = async () => {
  try {
    await client.from('inodes').insert({
      path: `${path.value}${name.value}/`,
      name: name.value,
      parent_path: path.value,
      user_id: user.value.id,
      resource_type: 'folder',
    });
  } catch (error) {
    console.error('Error writing document: ', error);
  } finally {
    emit('created-folder');
  }
}

const filenameInput = ref(null);
useFocus(filenameInput, { initialValue: true })

onMounted(async () => {
  if (fileTreeStore.selectedPath !== '') {
    path.value = fileTreeStore.selectedPath;
    fileTreeStore.selectedPath = '';
  } else {
    path.value = "/" + useFileTreeStore().path.slice(1).join('/');
  }
})
</script>

<template>
  <DialogHeader class="text-xs w-full flex flex-row items-center px-2">
    <ChevronLeftIcon class="size-4 mr-1 my-1 p-0.5 stroke-alttext hover:bg-accent rounded-md hover:cursor-pointer"
      @click="$emit(`back-clicked`)" />
    <div class="mr-1 text-alttext">Quick actions /</div>
    <FolderIcon class="size-3 mr-0.5" />
    <div>Create Folder</div>
  </DialogHeader>
  <Separator class="bg-altborder my-2" />
  <div class="px-2 space-y-4 overflow-y-scroll">
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Path</Label>
      <Input id="path" class="border-altborder bg-background" v-model="path" type="email" placeholder="/" disabled />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Folder Name</Label>
      <Input ref="filenameInput" id="path" class="border-altborder bg-background" v-model="name" type="email"
        placeholder="Untitled" autofocus />
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
    <Button class="w-full bg-violet-700 hover:bg-violet-600 text-white" variant="default" @click="createFolder">Create
      Folder</Button>
  </div>
</template>
