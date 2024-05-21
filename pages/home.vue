<script lang="ts" setup>
import { signOut } from 'firebase/auth'
import Editor from '@/components/tiptap/editor.vue'
import { Button } from '@/components/ui/button'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'

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
  <div>
    <Button @click="signOutAndNavigate(auth)">
      Sign out
    </Button>
  </div>
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}
</style>
