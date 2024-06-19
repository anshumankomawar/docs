<script setup lang="ts">
import { CommandLineIcon, UserIcon, CalendarDaysIcon, DocumentDuplicateIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, FolderIcon, ArchiveBoxIcon, TrashIcon, Cog6ToothIcon, QuestionMarkCircleIcon, MoonIcon, BellIcon, SunIcon } from '@heroicons/vue/24/outline'
import { useCommandPanelStore } from '~/stores/commandpanel';
const accounts = [
  {
    label: 'Docs',
    email: 'alicia@example.com',
    icon: 'solar:document-bold',
  },
]

const { updateCommandPath, updateIsCommandOpen } = useCommandPanelStore()
const isCollapsed = ref(false)
const colorMode = useColorMode()
const isNotificationsOpen = ref(false)

function handleNewFileClick() {
  updateCommandPath('create-file')
  updateIsCommandOpen(true)
}

function handleNewFolderClick() {
  updateCommandPath('create-folder')
  updateIsCommandOpen(true)
}

function handleFilesDialog(path: string) {
  navigateTo(`/${path}`)
}

function handleSettingsDialog() {
  updateCommandPath('settings')
  updateIsCommandOpen(true)
}

function handleAccountDialog() {
  updateCommandPath('account')
  updateIsCommandOpen(true)
}
</script>

<template>
  <div class="w-[250px] flex-none flex flex-col h-full overflow-none bg-altbackground py-2">
    <CommandPanel />
    <div class="px-2 pb-2 border-b border-altborder h-10">
      <SidebarSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
    </div>
    <div class="max-h-8 h-8 mx-2 flex space-x-1 text-xs text-start items-center justify-center mt-2">
      <div
        class="h-full flex-1 flex bg-background rounded-lg px-1.5 my-1 items-center justify-center border border-altborder">
        <CommandLineIcon class="size-4 mr-2" />
        <div>Quick Actions</div>
        <CommandShortcut class="border px-1 py-0.5 rounded-md w-min">⌘K</CommandShortcut>
      </div>
      <div class="h-full flex bg-background rounded-md items-center justify-center border border-altborder">
        <MagnifyingGlassIcon class="size-4 mx-1" />
        <CommandShortcut class="border px-1 mr-1 rounded-md size-5 text-center">/</CommandShortcut>
      </div>
    </div>
    <Popover :modal="true" v-model:open="isNotificationsOpen">
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent mt-2"
          :class="{ 'bg-accent': isNotificationsOpen }">
          <div class="flex flex-row items-center justify-start w-full">
            <BellIcon class="size-4" />
            <div class="pl-2 text-xs">Notifications</div>
            <div class="flex-grow"></div>
            <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘N</CommandShortcut>-->
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        class="ml-2 bg-altbackground shadow-2xl border-altborder border flex flex-col text-xs h-[300px] p-4">
        <div class="w-full text-sm">Notifications</div>
      </PopoverContent>
    </Popover>

    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click="handleNewFileClick">
      <div class="flex flex-row items-center justify-start w-full">
        <DocumentPlusIcon class="size-4" />
        <div class="pl-2 text-xs">New File</div>
        <div class="flex-grow"></div>
        <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘N</CommandShortcut>-->
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click="handleNewFolderClick">
      <div class=" flex flex-row items-center justify-start w-full">
        <FolderPlusIcon class="size-4" />
        <div class="pl-2 text-xs">New Folder</div>
        <div class="flex-grow"></div>
        <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘F</CommandShortcut>-->
      </div>
    </Button>
    <Separator orientation="horizontal" class="mt-3 mb-2 bg-altborder" />

    <div class="w-full flex flex-col flex-grow space-y-1">
      <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent"
        :class="{ 'bg-accent': $route.path === '/' }" @click=" handleFilesDialog('')">
        <div class="flex flex-row items-center justify-start w-full">
          <DocumentDuplicateIcon class="size-4" />
          <div class="pl-2 text-xs">Files</div>
        </div>
      </Button>
      <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click=" handleFilesDialog('trash')"
        :class="{ 'bg-accent': $route.path === '/trash' }">
        <div class="flex flex-row items-center justify-start w-full">
          <TrashIcon class="size-4" />
          <div class="pl-2 text-xs">Trash</div>
        </div>
      </Button>

      <!--<Collapsible v-for="(folder, index) in data" :key="folder.id" v-model:open="isOpen" class="w-full">
        <CollapsibleTrigger class="w-full" asChild>
          <Button variant="ghost" size="xs"
            :class="['w-full', 'rounded-md', { 'bg-accent': folder.id === selectedFolder }]"
            @click="handleFolderClick(`${folder.id}`)">
            <div class="flex flex-row items-center justify-start w-full">
              <BackpackIcon class="mt-0.5" />
              <div class="pl-2 text-xs">{{ folder.name }}</div>
              <div class="flex-grow"></div>
              <PlusIcon class="mt-0.5 mr-1" />
              <CaretDownIcon class="mt-0.5" />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
        </CollapsibleContent>
      </Collapsible>
      -->

      <div class="flex-grow"></div>

      <Separator orientation="horizontal" class="mt-2 mb-2 bg-altborder" />

      <div class="flex flex-col w-full px-2">
        <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent" @click="handleSettingsDialog">
          <div class=" flex flex-row items-center justify-start w-full">
            <Cog6ToothIcon class="size-4" />
            <div class="pl-2 text-xs">Settings</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent" @click="handleAccountDialog">
          <div class=" flex flex-row items-center justify-start w-full">
            <UserIcon class="size-4" />
            <div class="pl-2 text-xs">Account</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent">
          <div class=" flex flex-row items-center justify-start w-full">
            <QuestionMarkCircleIcon class="size-4" />
            <div class="pl-2 text-xs">Help</div>
          </div>
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent">
              <div class=" flex flex-row items-center justify-start w-full">
                <MoonIcon class="size-4" />
                <div class="pl-2 text-xs">Theme</div>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="ml-2 mb-2 p-1 w-min bg-altbackground border-altborder">
            <div class="flex flex-col w-min">
              <Button variant="ghost" size="xs" class="rounded-md hover:bg-altaccent"
                @click=" colorMode.preference = 'light'">
                <div class=" flex flex-row items-center justify-start w-full">
                  <SunIcon class="size-4" />
                  <div class="pl-2 text-xs">Light Mode</div>
                </div>
              </Button>
              <Button variant="ghost" size="xs" class="rounded-md hover:bg-altaccent"
                @click=" colorMode.preference = 'dark'">
                <div class=" flex flex-row items-center justify-start w-full">
                  <MoonIcon class="size-4" />
                  <div class="pl-2 text-xs">Dark Mode</div>
                </div>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</template>
