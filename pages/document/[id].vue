<script setup lang="ts">
import { DocumentTextIcon, LinkIcon } from '@heroicons/vue/24/outline';
import { ref as storageRef } from 'firebase/storage'


definePageMeta({
  layout: 'editor'
})
const tags = ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Firebase', 'Node.js', 'HTML', 'CSS', 'Webpack', 'Babel']

const route = useRoute()
const user = useCurrentUser();
const storage = useFirebaseStorage()

const filePath = `${user.value.uid}/${route.params.id}`
const { fileContent, loading, error, fetchFileContent } = useFileContent();

onMounted(async () => {
  await fetchFileContent(filePath);
});
</script>

<template>
  <div class="flex overflow-hidden">
    <div v-if="fileContent !== null" class="flex-1 overflow-y-scroll pt-16">
      <TiptapEditor :initial-content="fileContent" />
    </div>
    <div v-else class="flex-1 h-full w-full px-8">
      <div class="space-y-2 mt-24">
        <Skeleton class="h-8 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-24 w-full" />
        <Skeleton class="flex-1 w-full" />
      </div>
    </div>
    <Separator orientation="vertical" class="mt-24" />
    <div class="max-w-[200px] flex flex-col px-4 space-y-2 mt-24">
      <div class="flex items-center justify-start text-nowrap">
        <LinkIcon class="size-4 mr-1" />
        <div class="text-sm">Linked Docs</div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">
        <DocumentTextIcon class="size-4 mr-1" />
        <div class="">MobyDick Part 2.txt </div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">
        <DocumentTextIcon class="size-4 mr-1" />
        <div class="">MobyDick Part 3.txt </div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">
        <DocumentTextIcon class="size-4 mr-1" />
        <div class="">Essay Writing.txt </div>
      </div>
      <div class="flex items-center justify-start text-nowrap pt-8">
        <LinkIcon class="size-4 mr-1" />
        <div class="text-sm">Tags</div>
      </div>
      <div class="flex flex-wrap gap-2">
        <span v-for="(tag, index) in tags" :key="index"
          class="outline outline-accent px-2 py-1 rounded text-xs w-max hover:bg-accent hover:cursor-pointer">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
