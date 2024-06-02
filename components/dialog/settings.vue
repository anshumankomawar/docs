<script setup lang="ts">
import { ChevronLeftIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline';
</script>

<template>
  <DialogHeader class="text-xs w-full flex flex-row items-center px-2">
    <ChevronLeftIcon class="size-4 mr-1 my-1 p-0.5 stroke-alttext hover:bg-accent rounded-md hover:cursor-pointer"
      @click="$emit(`back-clicked`)" />
    <div class="mr-1 text-alttext">Quick actions /</div>
    <Cog6ToothIcon class="size-3 mr-0.5" />
    <div>Settings</div>
  </DialogHeader>
  <Separator class="bg-altborder my-2" />
</template>
