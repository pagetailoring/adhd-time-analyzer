<script setup lang="ts">
const { isProcessing } = storeToRefs(useProcessingState())
const debounced = useDebounce(isProcessing, 100)
</script>

<template>
  <UBadge :color="debounced ? 'success' : 'info'" class="transition-colors">
    <UiLoadingIcon :style="`animation-play-state: ${debounced ? 'running' : 'paused'};`" />
  </UBadge>
</template>
