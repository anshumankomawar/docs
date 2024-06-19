<script setup lang="ts">
import { DocumentTextIcon, LinkIcon } from '@heroicons/vue/24/outline';
import { useEditor } from '@tiptap/vue-3';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-icons/vue'


definePageMeta({
  layout: 'editor'
})

const tags = ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Firebase', 'Node.js', 'HTML', 'CSS', 'Webpack', 'Babel']

const route = useRoute()
const user = useCurrentUser();
const store = useFileTreeStore();
const displayPath = store.path.slice(1).join('/') + '/mobydick.txt'
const filePath = ref('');

const { fileContent, loading, error, fetchFileContent } = useFileContent();

onMounted(() => {
  if (user.value) {
    filePath.value = `${route.params.id}`;
    fetchFileContent(user.value.uid, filePath.value);
  } else {
    const unwatch = watch(user, (newUser) => {
      if (newUser) {
        filePath.value = `${route.params.id}`;
        fetchFileContent(newUser.uid, filePath.value);
        unwatch();
      }
    });
  }
});
</script>

<template>
  <div class="h-full w-full flex overflow-hidden">
    <div class="flex-1 flex flex-col">
      <div class="w-full h-8 bg-altbackground border-b border-altborder"></div>
      <div class="w-full h-full flex">
        <div class="flex-0 overflow-y-scroll mt-8 md:ml-8 lg:ml-18 pb-4 px-4 w-3/4 min-w-3/4">
          <TiptapEditor v-if="fileContent !== null" :initial-content="fileContent" :file-path="filePath" />
          <div v-else class="space-y-2 mt-8">
            <Skeleton class="w-36 h-12 mb-8" />
            <Skeleton class="h-8 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-24 w-full" />
            <Skeleton class="flex-1 w-full" />
          </div>
        </div>
        <div class="flex-1 max-w-1/4 bg-altbackground border-l border-altborder ml-4 py-16 px-4">
          <div>asdf</div>
        </div>
      </div>
    </div>
    <!--<div class="w-[250px] bg-altbackground border-l border-altborder"></div>-->

    <!--
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
-->
  </div>
</template>
