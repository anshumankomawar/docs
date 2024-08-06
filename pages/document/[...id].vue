<script setup lang="ts">
definePageMeta({
  layout: 'editor',
})

const route = useRoute();
const user = useSupabaseUser();
const client = useSupabaseClient()

const { data } = await useAsyncData('document', async () => {
  const id = (route.params.id as string[]).join('/');
  const inode_path = `${user.value.id}/${id}`
  const { data } = await client
    .from('versions')
    .select('*')
    .eq('inode_path', inode_path)
    .eq('version_number', 0)
    .single()

  return data
})
</script>

<template>
  <div class="h-full w-full flex overflow-hidden">
    <TiptapEditor v-if="data !== null" :initial-content="data.content" :file-path="data.inode_path" />
  </div>
</template>
