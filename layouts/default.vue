<template>
  <div class="flex-grow flex p-4 h-screen w-screen">
    <SidebarPanel />
    <div class="flex flex-col h-full w-full">
      <div class="flex w-full pb-4">
        <Filepath />
      </div>
      <slot />
    </div>
  </div>
</template>
