<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
            <BreadcrumbLink :href="item.link" class="text-sm">
              {{ item }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-if="index < store.path.length - 1" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>
