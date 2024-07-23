<script setup lang="ts">
import { ChevronLeftIcon, UserIcon } from '@heroicons/vue/24/outline';
import { Button } from '@/components/ui/button'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'
import { useSubscriptionStore } from '~/stores/subscriptions';

const auth = useFirebaseAuth()!;
const { logout } = useAuth();
const user = useCurrentUser()
const subscribtions = useSubscriptionStore()
const isUserLoaded = useIsCurrentUserLoaded()
const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const store = useCommandPanelStore()
const { resetPath } = usePathStore()

async function signOutAndNavigate(auth: any) {
  subscribtions.unsubscribeAll();
  logout();
  resetPath();
  await navigateTo('/login')
  store.updateIsCommandOpen(false)
  store.updateCommandPath('')
}

onMounted(() => {
  if (user.value) {
    firstName.value = user.value.displayName.split(' ')[0]
    lastName.value = user.value.displayName.split(' ')[1]
    email.value = user.value.email
  }
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
      <Input id="firstname" v-model="firstName" type="text" class="border-altborder bg-background" />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="text" class="text-xs ml-1">Last Name</Label>
      <Input id="lastname" v-model="lastName" type="text" class="border-altborder bg-background" />
    </div>
    <div class="grid items-center gap-1.5 ">
      <Label for="email" class="text-xs ml-1">Email</Label>
      <Input id="email" v-model="email" type="email" class="border-altborder bg-background" />
    </div>

    <Button class="w-full bg-violet-700 hover:bg-violet-600 text-white" variant="default"
      @click="signOutAndNavigate(auth)">
      Sign Out</Button>
  </div>
</template>
