<script setup lang="ts">
import { PlusCircledIcon, CalendarIcon, MagnifyingGlassIcon, BackpackIcon, HomeIcon, PersonIcon, CaretDownIcon, PlusIcon, PieChartIcon, RocketIcon, Pencil1Icon, FigmaLogoIcon, ArchiveIcon, GearIcon, QuestionMarkCircledIcon, MoonIcon } from '@radix-icons/vue';
const accounts = [
  {
    label: 'Alicia Koch',
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
const isOpen1 = ref(false)
const isOpen = ref(false)

const colorMode = useColorMode()
</script>

<template>
  <div class="w-[200px] flex-none mr-4 flex flex-col h-full overflow-none">
    <div class="pb-4">
      <SidebarSwitcher :is-collapsed="isCollapsed" :accounts="accounts" />
    </div>
    <Button variant="ghost" size="xs" class="h-8 mb-1 rounded-md">
      <div class="flex flex-row items-center justify-start w-full">
        <PlusCircledIcon class="mt-0.5" />
        <div class="pl-2 text-xs">New Doc</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘N</CommandShortcut>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="h-8 mb-1 rounded-md ">
      <div class="flex flex-row items-center justify-start w-full">
        <CalendarIcon class="mt-0.5" />
        <div class="pl-2 text-xs">Recent Docs</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘R</CommandShortcut>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="h-8 mb-1 rounded-md ">
      <div class="flex flex-row items-center justify-start w-full">
        <ArchiveIcon class="mt-0.5" />
        <div class="pl-2 text-xs">Archive</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘A</CommandShortcut>
      </div>
    </Button>
    <Button variant="ghost" size="xs" class="h-8 mb-1 rounded-md ">
      <div class="flex flex-row items-center justify-start w-full">
        <MagnifyingGlassIcon class="mt-0.5" />
        <div class="pl-2 text-xs">Search</div>
        <div class="flex-grow"></div>
        <CommandShortcut class="bg-accent px-1 py-0.5 rounded-sm">⌘S</CommandShortcut>
      </div>
    </Button>

    <Separator orientation="horizontal" class="mt-2 mb-2" />

    <div class="w-full flex flex-col flex-grow">
      <Collapsible v-model:open="isOpen1" class="w-full">
        <CollapsibleTrigger class="w-full" asChild>
          <Button variant="ghost" size="xs" class="w-full rounded-md bg-accent">
            <div class="flex flex-row items-center justify-start w-full">
              <BackpackIcon class="mt-0.5" />
              <div class="pl-2 text-xs">Work</div>
              <div class="flex-grow"></div>
              <PlusIcon class="mt-0.5 mr-1" />
              <CaretDownIcon class="mt-0.5" />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="flex flex-col space-y-1 ml-4 mt-1">
            <Button variant="ghost" size="xs" class="w-full rounded-md bg-accent">
              <div class="flex flex-row items-center justify-start w-full">
                <PieChartIcon class="mt-0.5" />
                <div class="pl-2 text-xs ">Analytics</div>
              </div>
            </Button>
            <Button variant="ghost" size="xs" class="w-full rounded-md">
              <div class="flex flex-row items-center justify-start flex-grow">
                <PersonIcon class="mt-0.5 " />
                <div class="pl-2 text-xs">People</div>
              </div>
            </Button>
            <Button variant="ghost" size="xs" class="w-full rounded-md">
              <div class="flex flex-row items-center justify-start flex-grow">
                <RocketIcon class="mt-0.5 " />
                <div class="pl-2 text-xs">Ideas</div>
              </div>
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible v-model:open="isOpen" class="w-full mt-2">
        <CollapsibleTrigger class="w-full" asChild>
          <Button variant="ghost" size="xs" class="w-full rounded-md">
            <div class="flex flex-row items-center justify-start w-full">
              <HomeIcon class="mt-0.5" />
              <div class="pl-2 text-xs">Personal</div>
              <div class="flex-grow"></div>
              <PlusIcon class="mt-0.5 mr-1" />
              <CaretDownIcon class="mt-0.5" />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="flex flex-col mx-4 space-y-1 mt-1">
            <Button variant="ghost" size="xs" class="w-full rounded-md">
              <div class="flex flex-row items-center justify-start w-full">
                <Pencil1Icon class="mt-0.5" />
                <div class="pl-2 text-xs ">Notes</div>
              </div>
            </Button>
            <Button variant="ghost" size="xs" class="w-full rounded-md">
              <div class="flex flex-row items-center justify-start flex-grow">
                <FigmaLogoIcon class="mt-0.5" />
                <div class="pl-2 text-xs">Design Ideas</div>
              </div>
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div class="flex-grow"></div>

      <Separator orientation="horizontal" class="mt-2 mb-2" />

      <div class="flex flex-col w-full">
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <GearIcon class="mt-0.5" />
            <div class="pl-2 text-xs">Settings</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <PersonIcon class="mt-0.5" />
            <div class="pl-2 text-xs">Account</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md">
          <div class="flex flex-row items-center justify-start w-full">
            <QuestionMarkCircledIcon class="mt-0.5" />
            <div class="pl-2 text-xs">Help</div>
          </div>
        </Button>
        <Button variant="ghost" size="xs" class="w-full rounded-md" @click="colorMode.preference = 'light'">
          <div class="flex flex-row items-center justify-start w-full">
            <MoonIcon class="mt-0.5" />
            <div class="pl-2 text-xs">Theme</div>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>
