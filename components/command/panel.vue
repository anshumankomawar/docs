<script setup lang="ts">
import { BellIcon, CalendarIcon, CalendarDaysIcon, SparklesIcon, Cog6ToothIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import { useMagicKeys } from '@vueuse/core'

const props = defineProps<{
  open: Function
}>();

const open = ref(false)
const keys = useMagicKeys()
const CmdK = keys['Cmd+K']

const colorMode = useColorMode()

function handleCreateNote() {
  props.open()
  open.value = false
}

function handleOpenChange() {
  open.value = !open.value
}

function handleToggleTheme() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  open.value = false
}

watch(CmdK, (v) => {
  if (v)
    handleOpenChange()
})
</script>

<template>
  <CommandDialog :open="open" @update:open="handleOpenChange" class="bg-altbackground">
    <CommandInput placeholder="Type a command or search..." class="" />
    <CommandList>
      <CommandGroup heading="Quick Action">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandItem value="open-calendar">
          <div class="flex items-center gap-2">
            <CalendarDaysIcon class="size-4" />
            Open Calendar
          </div>
        </CommandItem>
        <CommandItem value="search-notes">
          <div class="flex items-center gap-2">
            <MagnifyingGlassIcon class="size-4" />
            Search Notes
          </div>
        </CommandItem>
        <CommandItem value="create-note" @select="handleCreateNote">
          <div class="flex items-center gap-2">
            <DocumentPlusIcon class="size-4" />
            Create Note
          </div>
        </CommandItem>
        <CommandItem value="create-folder">
          <div class="flex items-center gap-2">
            <FolderPlusIcon class="size-4" />
            Create Folder
          </div>
        </CommandItem>
        <CommandItem value="account-settings">
          <div class="flex items-center gap-2">
            <Cog6ToothIcon class="size-4" />
            Open account settings
          </div>
        </CommandItem>
        <CommandItem value="view-notifications">
          <div class="flex items-center gap-2">
            <BellIcon class="size-4" />
            View Notifications
          </div>
        </CommandItem>
        <CommandItem value="toggle-theme" @select="handleToggleTheme">
          <div class="flex items-center gap-2">
            <SparklesIcon class="size-4" />
            Toggle Theme
          </div>
        </CommandItem>
        <CommandItem value="light-theme" @select="colorMode.value = 'light'">
          <div class="flex items-center gap-2">
            <SunIcon class="size-4" />
            Use light theme
          </div>
        </CommandItem>
        <CommandItem value="dark-theme" @select="colorMode.value = 'dark'">
          <div class="flex items-center gap-2">
            <MoonIcon class="size-4" />
            Use dark theme
          </div>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
