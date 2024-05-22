<script setup lang="ts">
import { BadgeIcon, FileTextIcon, IdCardIcon, Link2Icon, PersonIcon } from '@radix-icons/vue';
const tags = ['Vue.js', 'JavaScript', 'Tailwind CSS', 'Firebase', 'Node.js', 'HTML', 'CSS', 'Webpack', 'Babel']
</script>

<template>
  <div class="flex overflow-hidden">
    <TiptapEditor />
    <Separator orientation="vertical" class="mt-24" />
    <div class="flex flex-col px-4 space-y-2 mt-24">
      <div class="flex items-center justify-start text-nowrap">
        <Link2Icon class="w-4 h-4 mr-1" />
        <div class="text-sm">Linked Docs</div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">

        <FileTextIcon class="w-4 h-4 mr-1" />
        <div class="">MobyDick Part 2.txt </div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">
        <FileTextIcon class="w-4 h-4 mr-1" />
        <div class="">MobyDick Part 3.txt </div>
      </div>
      <div
        class="flex items-center justify-start rounded-lg shadow-sm outline outline-accent text-xs p-1 hover:cursor-pointer hover:bg-accent text-nowrap">
        <FileTextIcon class="w-4 h-4 mr-1" />
        <div class="">Essay Writing.txt </div>
      </div>
      <div class="flex items-center justify-start text-nowrap pt-8">
        <IdCardIcon class="w-4 h-4 mr-1" />
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
