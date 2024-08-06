<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AccountSwitcherProps {
  isCollapsed: boolean
  accounts: {
    label: string
    email: string
    icon: string
  }[]
}

const props = defineProps<AccountSwitcherProps>()

const selectedEmail = ref<string>(props.accounts[0].email)
const selectedEmailData = computed(() => props.accounts.find(item => item.email === selectedEmail.value))
</script>

<template>
  <Select v-model="selectedEmail">
    <SelectTrigger aria-label="Select account"
      class="h-8 flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 shadow-none border-none">
      <SelectValue placeholder="Select an account">
        <div class="flex items-center gap-2">
          <Icon class="size-4" :icon="selectedEmailData!.icon" />
          <span v-if="!isCollapsed" class="text-md">
            {{ selectedEmailData!.label }}
          </span>
        </div>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="account of accounts" :key="account.email" :value="account.email">
        <div class="flex items-center gap-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
          <Icon class="size-4" :icon="account.icon" />
          {{ account.email }}
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</template>
