<script setup lang="ts">
const emit = defineEmits<{ (event: 'isMounted'): void }>()
</script>

<template>
  <div class="relative flex h-full w-full">
    <LazySummaryBarChartGroups
      class="bg-default z-2 flex h-full w-10 min-w-10 flex-col px-2 py-1"
      @is-mounted="emit('isMounted')"
    />
  </div>
</template>
