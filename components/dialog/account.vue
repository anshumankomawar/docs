<script setup lang="ts">
import { ChevronLeftIcon, UserIcon } from '@heroicons/vue/24/outline';
import { Button } from '@/components/ui/button'

const client = useSupabaseClient()
const user = useSupabaseUser()
const ftStore = useFileTreeStore()

async function signOutAndNavigate() {
  const user_id = user.value.id;
  await client.auth.signOut();
  ftStore.resetPath(user_id);
  navigateTo('/login')
}

const { data } = await useAsyncData('user', async () => {
  return await client.from('users').select('*').eq('id', user.value.id).single()
})
</script>

<template>
  <DialogHeader class="text-xs w-full flex flex-row items-center px-2">
    <ChevronLeftIcon class="size-4 mr-1 my-1 p-0.5 stroke-alttext hover:bg-accent rounded-md hover:cursor-pointer"
      @click="$emit(`back-clicked`)" />
    <div class="mr-1 text-alttext">Quick actions /</div>
    <UserIcon class="size-3 mr-0.5" />
    <div>Account</div>
  </DialogHeader>
  <Separator class="bg-altborder my-2" />
  <div class="px-2 space-y-4 overflow-y-scroll">
    <div class="grid items-center gap-1.5 ">
      <Label for="text" class="text-xs ml-1">First Name</Label>
      <Input id="firstname" v-model="data.data.first_name" type="text" class="border-altborder bg-background" />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="text" class="text-xs ml-1">Last Name</Label>
      <Input id="lastname" v-model="data.data.last_name" type="text" class="border-altborder bg-background" />
    </div>
    <Button class="w-full bg-violet-700 hover:bg-violet-600 text-white" variant="default" @click="signOutAndNavigate()">
      Sign Out</Button>
  </div>
</template>
