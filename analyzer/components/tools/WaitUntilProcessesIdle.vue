<script setup lang="ts">
// Emit to trigger the next element in a lazy-loading chain
const emit = defineEmits<{ (event: 'trigger'): void }>()

const isLoaded = ref(false)

const { isProcessing } = storeToRefs(useProcessingState())
const debounce = DELAY_THRESHOLD
watchDebounced(
  isProcessing,
  (val) => {
    if (!val) {
      isLoaded.value = true
      emit('trigger')
      if (isDev) console.log(toolsIcon, 'idle')
    }
  },
  { debounce, immediate: true }
)
</script>

<template>
  <div v-if="isLoaded">
    <slot></slot>
  </div>
</template>
