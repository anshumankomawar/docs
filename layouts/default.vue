<template>
  <div class="flex h-screen w-screen">
    <div class="border-r">
      <SidebarPanel />
    </div>
    <div class="flex flex-col h-full w-full overflow-none overflow-hidden pt-2">
      <div class="flex-none flex w-full overflow-none border-b h-10">
        <Filepath />
      </div>
      <slot />
    </div>
  </div>
</template>
