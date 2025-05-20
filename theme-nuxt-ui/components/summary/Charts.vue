<script setup lang="ts">
const emit = defineEmits<{ (event: 'isMounted'): void }>()
</script>

<template>
  <div class="h-full w-full relative">
    <LazyBarChartGroups
      class="absolute z-10 flex h-full w-10 flex-col bg-default px-2 py-1"
      @is-mounted="emit('isMounted')"
    />
  </div>
</template>
