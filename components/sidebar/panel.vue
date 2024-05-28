<script setup lang="ts">
import { CommandLineIcon, UserIcon, CalendarDaysIcon, DocumentDuplicateIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, FolderIcon, ArchiveBoxIcon, TrashIcon, Cog6ToothIcon, QuestionMarkCircleIcon, MoonIcon, BellIcon } from '@heroicons/vue/24/outline'
const accounts = [
  {
    label: 'Docs',
    email: 'alicia@example.com',
    icon: 'solar:document-bold',
  },
]

const isCollapsed = ref(false)
const openNewFilePanel = ref(false)
const openNewFolderPanel = ref(false)
const colorMode = useColorMode()

function handleFolderClick(path: string) {
  navigateTo(`/${path}`)
}
</script>

<template>
  <div class="w-[250px] flex-none flex flex-col h-full overflow-none bg-altbackground py-2">
    <div class="px-2 pb-2 border-b border-altborder h-10">
      <SidebarSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
    </div>
    <div class="h-6 mx-2 my-4 flex space-x-1 text-xs text-start items-center justify-center">
      <div class="flex-1 flex bg-background rounded-lg px-2 py-1 items-center justify-center border border-altborder">
        <CommandLineIcon class="size-4 mr-2" />
        <div>Quick Actions</div>
        <CommandShortcut class="border px-1 py-0.5 rounded-md w-min">⌘K</CommandShortcut>
      </div>
      <div class="flex bg-background rounded-md p-1 items-center justify-center border border-altborder">
        <MagnifyingGlassIcon class="size-4 mr-1" />
        <CommandShortcut class="border px-1 rounded-md w-5 h-5 text-center">/</CommandShortcut>
      </div>
    </div>
    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent">
      <div class="flex flex-row items-center justify-start w-full">
        <BellIcon class="size-4" />
        <div class="pl-2 text-xs">Notifications</div>
        <div class="flex-grow"></div>
        <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘N</CommandShortcut>-->
      </div>
    </Button>

    <Sheet v-model:open="openNewFilePanel">
      <SheetTrigger asChild>
        <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent">
          <div class="flex flex-row items-center justify-start w-full">
            <DocumentPlusIcon class="size-4" />
            <div class="pl-2 text-xs">New File</div>
            <div class="flex-grow"></div>
            <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘N</CommandShortcut>-->
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent class="h-full">
        <Newfilepanel class="h-full" @close-sheet="openNewFilePanel = false" />
      </SheetContent>
    </Sheet>
    <Sheet v-model:open="openNewFolderPanel">
      <SheetTrigger asChild>
        <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent"">
          <div class=" flex flex-row items-center justify-start w-full">
          <FolderPlusIcon class="size-4" />
          <div class="pl-2 text-xs">New Folder</div>
          <div class="flex-grow"></div>
          <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘F</CommandShortcut>-->
  </div>
  </Button>
  </SheetTrigger>
  <SheetContent class="h-full">
    <Newfolderpanel class="h-full" @close-sheet="openNewFolderPanel = false" />
  </SheetContent>
  </Sheet>
  <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent">
    <div class=" flex flex-row items-center justify-start w-full">
      <CalendarDaysIcon class="size-4" />
      <div class="pl-2 text-xs">Recent Docs</div>
      <div class="flex-grow"></div>
      <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘R</CommandShortcut>-->
    </div>
  </Button>
  <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent">
    <div class=" flex flex-row items-center justify-start w-full">
      <MagnifyingGlassIcon class="size-4" />
      <div class="pl-2 text-xs">Search</div>
      <div class="flex-grow"></div>
      <!--<CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm w-8">⌘S</CommandShortcut>-->
    </div>
  </Button>

  <Separator orientation="horizontal" class="mt-2 mb-2 bg-altborder" />

  <div class="w-full flex flex-col flex-grow">
    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click=" handleFolderClick('path')">
      <div class="flex flex-row items-center justify-start w-full">
        <DocumentDuplicateIcon class="size-4" />
        <div class="pl-2 text-xs">Files</div>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click="
      handleFolderClick('archive')">
      <div class="flex flex-row items-center justify-start w-full">
        <ArchiveBoxIcon class="size-4" />
        <div class="pl-2 text-xs">Archive</div>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="rounded-md mx-2 hover:bg-altaccent" @click=" handleFolderClick('trash')">
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
      <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent">
        <div class=" flex flex-row items-center justify-start w-full">
          <Cog6ToothIcon class="size-4" />
          <div class="pl-2 text-xs">Settings</div>
        </div>
      </Button>
      <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent">
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
      <Button variant="ghost" size="xs" class="w-full rounded-md hover:bg-altaccent"
        @click=" colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'">
        <div class=" flex flex-row items-center justify-start w-full">
          <MoonIcon class="size-4" />
          <div class="pl-2 text-xs">Theme</div>
        </div>
      </Button>
    </div>
  </div>
  </div>
</template>
