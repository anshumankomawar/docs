<template>
  <div class="flex-grow flex px-4 pt-4 h-screen w-screen">
    <div class="pb-4">
      <SidebarPanel />
    </div>
    <div class="flex flex-col h-full w-full overflow-none overflow-hidden">
      <slot />
    </div>
  </div>
</template>
