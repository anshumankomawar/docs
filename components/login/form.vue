<script lang="ts" setup>
import { GithubLogoIcon } from '@radix-icons/vue';

const supabase = useSupabaseClient();
const config = useRuntimeConfig();

const redirectTo = `http://${config.public.url}/confirm`

async function signInWithProvider(provider: any) {
  try {
    const { error } = await supabase.auth.signInWithOAuth(
      {
        provider,
        options: { redirectTo },
      },
    )
    if (error) throw error
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <Card class="mx-auto max-w-sm border-none shadow-none dark:bg-background">
      <CardHeader>
        <CardTitle class="text-8xl text-center">
          docs
        </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-2 pt-8">
        <Button variant="outline" @click="signInWithProvider('github')">
          <GithubLogoIcon class="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline" class="mb-4">
          <svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
            <path fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          Google
        </Button>
        <p class="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our
          <a href="/terms" class="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>
          and
          <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </CardContent>
    </Card>
  </div>
</template>
