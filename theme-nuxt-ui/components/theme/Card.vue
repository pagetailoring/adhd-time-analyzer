<script lang="ts" setup>
const { isBorder = true, isGrid = false } = defineProps<{
  isBorder?: boolean
  isGrid?: boolean
}>()

const talwindClass = ref([
  isGrid ? 'grid' : 'flex',
  isBorder ? 'border' : '',
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
