<script setup lang="ts">
const emit = defineEmits<{ (event: 'isMounted'): void }>()
</script>

<template>
  <div class="h-full w-full relative">
    <LazyBarChartGroups class="z-2" @is-mounted="emit('isMounted')" />
  </div>
</template>
