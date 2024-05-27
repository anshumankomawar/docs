<script setup lang="ts">
import { UserIcon, CalendarDaysIcon, DocumentDuplicateIcon, DocumentPlusIcon, FolderPlusIcon, MagnifyingGlassIcon, FolderIcon, ArchiveBoxIcon, TrashIcon, Cog6ToothIcon, QuestionMarkCircleIcon, MoonIcon } from '@heroicons/vue/24/outline'
const accounts = [
  {
    label: 'Personal',
    email: 'alicia@example.com',
    icon: 'ion:logo-vercel',
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@gmail.com',
    icon: 'mdi:google',
  },
  {
    label: 'Alicia Koch',
    email: 'alicia@me.com',
    icon: 'bx:bxl-gmail',
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
  <div class="w-[200px] flex-none flex flex-col h-full overflow-none">
    <div class="pb-2">
      <SidebarSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
    </div>
    <Sheet v-model:open="openNewFilePanel">
      <SheetTrigger asChild>
        <Button variant="ghost" size="xs" class="rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <DocumentPlusIcon class="size-4" />
            <div class="pl-2 text-xs">New File</div>
            <div class="flex-grow"></div>
            <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘N</CommandShortcut>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent class="h-full">
        <Newfilepanel class="h-full" @close-sheet="openNewFilePanel = false" />
      </SheetContent>
    </Sheet>
    <Sheet v-model:open="openNewFolderPanel">
      <SheetTrigger asChild>
        <Button variant="ghost" size="xs" class="rounded-md ">
          <div class="flex flex-row items-center justify-start w-full">
            <FolderPlusIcon class="size-4" />
            <div class="pl-2 text-xs">New Folder</div>
            <div class="flex-grow"></div>
            <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘F</CommandShortcut>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent class="h-full">
        <Newfolderpanel class="h-full" @close-sheet="openNewFolderPanel = false" />
      </SheetContent>
    </Sheet>
    <Button variant="ghost" size="xs" class="rounded-md ">
      <div class="flex flex-row items-center justify-start w-full">
        <CalendarDaysIcon class="size-4" />
        <div class="pl-2 text-xs">Recent Docs</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘R</CommandShortcut>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="rounded-md ">
      <div class="flex flex-row items-center justify-start w-full">
        <MagnifyingGlassIcon class="size-4" />
        <div class="pl-2 text-xs">Search</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘S</CommandShortcut>
      </div>
    </Button>

    <Separator orientation="horizontal" class="mt-2 mb-2" />

    <div class="w-full flex flex-col flex-grow">
      <Button variant="ghost" size="xs" class="rounded-md" @click="handleFolderClick('path')">
        <div class="flex flex-row items-center justify-start w-full">
          <DocumentDuplicateIcon class="size-4" />
          <div class="pl-2 text-xs">Files</div>
        </div>
      </Button>
      <Button variant="ghost" size="xs" class="rounded-md" @click="handleFolderClick('archive')">
        <div class="flex flex-row items-center justify-start w-full">
          <ArchiveBoxIcon class="size-4" />
          <div class="pl-2 text-xs">Archive</div>
        </div>
      </Button>
      <Button variant="ghost" size="xs" class="rounded-md" @click="handleFolderClick('trash')">
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

      <Separator orientation="horizontal" class="mt-2 mb-2" />

      <div class="flex flex-col w-full">
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <Cog6ToothIcon class="size-4" />
            <div class="pl-2 text-xs">Settings</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <UserIcon class="size-4" />
            <div class="pl-2 text-xs">Account</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <QuestionMarkCircleIcon class="size-4" />
            <div class="pl-2 text-xs">Help</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md" @click="colorMode.preference = 'light'">
          <div class="flex flex-row items-center justify-start w-full">
            <MoonIcon class="size-4" />
            <div class="pl-2 text-xs">Theme</div>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>
