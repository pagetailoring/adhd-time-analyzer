<script setup lang="ts">
const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()

const { tags } = defineProps<{
  tags?: TimeLogTag[]
}>()

function copyTagsToForm() {
  if (tags && tags.length) form.tags = tags as TimeLogTag[]
}
</script>

<template>
  <div @click="copyTagsToForm()">
    <slot />
  </div>
</template>
