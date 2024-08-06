<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useFileTreeStore } from '@/stores/filetree';

const store = useFileTreeStore();
</script>

<template>
  <div class="flex h-8 pl-4 items-center justify-center text-center">
    <Breadcrumb>
      <BreadcrumbList>
        <template v-for="(item, index) in store.path" :key="index">
          <BreadcrumbItem>
            <BreadcrumbLink v-if="index === 0" :href="item.link" class="text-xs"
              :class="{ 'dark:text-white text-black': index === store.path.length - 1 }">
              Home
            </BreadcrumbLink>
            <BreadcrumbLink v-else :href="item.link" class="text-xs"
              :class="{ 'dark:text-white text-black': index === store.path.length - 1 }">
              {{ item }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-if="index < store.path.length - 1" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>
