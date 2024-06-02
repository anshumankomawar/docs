<script setup lang="ts">
import { BellIcon, UserIcon, CalendarDaysIcon, SparklesIcon, Cog6ToothIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import { useMagicKeys } from '@vueuse/core'
import { useCommandPanelStore } from '@/stores/commandpanel';

const store = useCommandPanelStore()
const keys = useMagicKeys()
const CmdK = keys['Cmd+K']
const CmdN = keys['Cmd+I']
const colorMode = useColorMode()

function handleCreateFile() {
  store.updateCommandPath('create-file')
}

function handleCreateFolder() {
  store.updateCommandPath('create-folder')
}

function handleToggleTheme() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  store.updateIsCommandOpen(false)
}

function handleSettings() {
  store.updateCommandPath('settings')
}

function handleAccount() {
  store.updateCommandPath('account')
}

function lastCommand() {
  store.updateCommandPath('')
}

function handleOpenChange(v: boolean) {
  if (!v) {
    store.updateIsCommandOpen(v)
  }
}

watch(CmdK, (v) => {
  if (v) {
    store.updateCommandPath('')
    store.updateIsCommandOpen(true)
  }
})

watch(CmdN, (v) => {
  if (v) {
    store.updateCommandPath('create-file')
    store.updateIsCommandOpen(true)
  }
})

</script>

<template>
  <CommandDialog :open="store.isCommandOpen" @update:open="handleOpenChange"
    class="bg-altbackground ring-none outline-none" :is-command="store.commandPath === ''">
    <div v-if="store.commandPath === ''">
      <CommandInput placeholder="Type a command or search..." class="" />
      <CommandList>
        <CommandGroup heading="Quick Action">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem value="open-calendar" class="text-xs">
            <div class="flex items-center gap-2">
              <CalendarDaysIcon class="size-4" />
              Open Calendar
            </div>
          </CommandItem>
          <CommandItem value="search-notes" class="text-xs">
            <div class="flex items-center gap-2">
              <MagnifyingGlassIcon class="size-4" />
              Search Notes
            </div>
          </CommandItem>
          <CommandItem value="create-note" @select="handleCreateFile" class="text-xs">
            <div class="flex items-center gap-2">
              <DocumentPlusIcon class="size-4" />
              Create File
            </div>
          </CommandItem>
          <CommandItem value="create-folder" @select="handleCreateFolder" class="text-xs">
            <div class="flex items-center gap-2">
              <FolderPlusIcon class="size-4" />
              Create Folder
            </div>
          </CommandItem>
          <CommandItem value="settings" class="text-xs" @select="handleSettings">
            <div class="flex items-center gap-2">
              <Cog6ToothIcon class="size-4" />
              Open settings
            </div>
          </CommandItem>
          <CommandItem value="account" class="text-xs" @select="handleAccount">
            <div class="flex items-center gap-2">
              <UserIcon class="size-4" />
              Open account settings
            </div>
          </CommandItem>
          <CommandItem value="view-notifications" class="text-xs">
            <div class="flex items-center gap-2">
              <BellIcon class="size-4" />
              View Notifications
            </div>
          </CommandItem>
          <CommandItem value="toggle-theme" @select="handleToggleTheme" class="text-xs">
            <div class="flex items-center gap-2">
              <SparklesIcon class="size-4" />
              Toggle Theme
            </div>
          </CommandItem>
          <CommandItem value="light-theme" @select="colorMode.value = 'light'" class="text-xs">
            <div class="flex items-center gap-2">
              <SunIcon class="size-4" />
              Use light theme
            </div>
          </CommandItem>
          <CommandItem value="dark-theme" @select="colorMode.value = 'dark'" class="text-xs">
            <div class="flex items-center gap-2">
              <MoonIcon class="size-4" />
              Use dark theme
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </div>

    <div v-else class="py-2 overflow-y-scroll">
      <DialogCreateFile v-if="store.commandPath === 'create-file'" @back-clicked="lastCommand"
        @created-file="store.isCommandOpen = false" />
      <DialogCreateFolder v-if="store.commandPath === 'create-folder'" @back-clicked="lastCommand"
        @created-folder="store.isCommandOpen = false" />
      <DialogSettings v-if="store.commandPath === 'settings'" @back-clicked="lastCommand" />
      <DialogAccount v-if="store.commandPath === 'account'" @back-clicked="lastCommand" />
    </div>
  </CommandDialog>
</template>
