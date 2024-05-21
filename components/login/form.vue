<script lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script lang="ts" setup>
import {
  signInWithPopup,
} from 'firebase/auth'
import {
  useCurrentUser,
  useFirebaseAuth,
  useIsCurrentUserLoaded,
} from 'vuefire'

const auth = useFirebaseAuth()! // only exists on client side
const user = useCurrentUser()
const isUserLoaded = useIsCurrentUserLoaded()

const error = ref<Error | null>(null)
function signinPopup() {
  error.value = null
  signInWithPopup(auth, googleAuthProvider).catch((reason) => {
    console.error('Failed signinPopup', reason)
    error.value = reason
  }).then(() => {
    navigateTo('/home')
  })
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" class="w-full">
            Login
          </Button>
          <Button variant="outline" class="w-full" @click="signinPopup">
            Login with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/register">Sign up</NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
