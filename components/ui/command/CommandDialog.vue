<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import Command from './Command.vue'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const props = defineProps<DialogRootProps & { isCommand: boolean }>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent
      class="overflow-hidden p-0 shadow-lg bg-altbackground w-5/6 max-w-[600px] max-h-3/5 ring-none outline-none">
      <Command v-if="isCommand"
        class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <slot />
      </Command>
      <slot v-else />
    </DialogContent>
  </Dialog>
</template>
