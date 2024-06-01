<script setup lang="ts">
import { BellIcon, CalendarDaysIcon, SparklesIcon, Cog6ToothIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline';
import { useMagicKeys } from '@vueuse/core'

type Model = {
  commandPath: string
  isCommandOpen: boolean
}

const model = defineModel<Model>({ required: true })

const keys = useMagicKeys()
const CmdK = keys['Cmd+K']
const CmdN = keys['Cmd+I']
const colorMode = useColorMode()

function handleCreateFile() {
  model.value.commandPath = 'create-file'
}

function handleCreateFolder() {
  model.value.commandPath = 'create-folder'
}

function handleToggleTheme() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
  model.value.isCommandOpen = false
}

function lastCommand() {
  model.value.commandPath = ''
}

function handleOpenChange(v: boolean) {
  if (!v) {
    model.value.isCommandOpen = v
  }
}

watch(CmdK, (v) => {
  if (v)
    model.value = { commandPath: '', isCommandOpen: true }
})

watch(CmdN, (v) => {
  if (v) {
    model.value = { commandPath: 'create-file', isCommandOpen: true }
  }
})

</script>

<template>
  <CommandDialog :open="model.isCommandOpen" @update:open="handleOpenChange"
    class="bg-altbackground ring-none outline-none" :is-command="model.commandPath === ''">
    <div v-if="model.commandPath === ''">
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
          <CommandItem value="account-settings" class="text-xs">
            <div class="flex items-center gap-2">
              <Cog6ToothIcon class="size-4" />
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
      <DialogCreateFile v-if="model.commandPath === 'create-file'" @back-clicked="lastCommand"
        @created-file="model.isCommandOpen = false" />
      <DialogCreateFolder v-if="model.commandPath === 'create-folder'" @back-clicked="lastCommand"
        @created-folder="model.isCommandOpen = false" />
    </div>
  </CommandDialog>
</template>
