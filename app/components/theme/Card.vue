<script lang="ts" setup>
const {
  isBorder = true,
  isPadding = true,
  isGrid = false,
} = defineProps<{
  isBorder?: boolean
  isPadding?: boolean
  isGrid?: boolean
}>()

const talwindClass = ref([
  isGrid ? 'grid' : 'flex',
  isBorder ? styleBorder : '',
  isBorder && isPadding ? 'p-4' : '',
  'divide-y divide-(--ui-border)',
  'items-center gap-2',
  'overflow-hidden',
])
</script>

<template>
  <div :class="talwindClass">
    <slot></slot>
  </div>
</template>
