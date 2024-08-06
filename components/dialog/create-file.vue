<script setup lang="ts">
import { ChevronLeftIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import { useFocus } from '@vueuse/core'

const emits = defineEmits(['created-file', 'back-clicked'])

const user = useSupabaseUser()
const fileTreeStore = useFileTreeStore()
const tags = ref([])
const path = ref<string>('')
const name = ref<string>('')
const client = useSupabaseClient()

const createFile = async () => {
  try {
    await client.from('inodes').insert({
      path: `${path.value}${name.value}`,
      name: name.value,
      parent_path: fileTreeStore.selectedInode.id,
      user_id: user.value.id,
      resource_type: 'file',
    });
  } catch (error) {
    console.error('Error creating file: ', error);
    return;
  }

  try {
    await client.from('versions').insert({
      inode_path: `${path.value}${name.value}`,
      content: '',
      version_number: 0,
      user_id: user.value.id,
    })
  } catch (error) {
    console.error('Error creating version: ', error);
    return;
  }

  emits('created-file');
}

const filenameInput = ref(null);
useFocus(filenameInput, { initialValue: true })

onMounted(() => {
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
    <DocumentIcon class="size-3 mr-0.5" />
    <div>Create File</div>
  </DialogHeader>
  <Separator class="bg-altborder my-2" />
  <div class="px-2 space-y-4 overflow-y-scroll">
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Path</Label>
      <Input id="path" class="border-altborder bg-background" v-model="path" type="email" placeholder="/" disabled />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">File Name</Label>
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
    <Button class="w-full bg-violet-700 hover:bg-violet-600 text-white" variant="default" @click="createFile">Create
      File</Button>
  </div>
</template>
