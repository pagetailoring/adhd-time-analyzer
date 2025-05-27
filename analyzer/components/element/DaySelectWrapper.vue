<script setup lang="ts">
const { classToAdd = '' } = defineProps<{
  classToAdd?: string
}>()

const style = 'up ' + classToAdd
</script>

<template>
  <Suspense>
    <template #fallback>
      <UiSkeleton :class="style" />
    </template>

    <LazyElementDaySelect :class="style" />
  </Suspense>
</template>
