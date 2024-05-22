<script lang="ts" setup>
import { signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'
import { ConfigProvider } from 'radix-vue'

const useIdFunction = () => useId()
const auth = useFirebaseAuth()!;
const user = useCurrentUser()
const isUserLoaded = useIsCurrentUserLoaded()

async function signOutAndNavigate(auth: any) {
  await signOut(auth).then(() => {
    navigateTo('/')
  })
}

</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div>
      <Button @click="signOutAndNavigate(auth)">
        Sign out
      </Button>
    </div>
  </ConfigProvider>
</template>
