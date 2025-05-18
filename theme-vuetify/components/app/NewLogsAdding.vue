<script lang="ts" setup>
// const { shouldTriggerLoad = false } = defineProps<{
//   shouldTriggerLoad?: boolean
// }>()

// const isShortcutsBar = ref(false)
</script>

<template>
  <LazyNewLogsAddForm />
  <!-- <Suspense>
    <template #default>
      <LazyNewLogsAddForm v-if="shouldTriggerLoad" @is-mounted="isShortcutsBar = true" />

      <UiSkeleton v-else class="h-80 sm:h-38 lg:h-24" />
    </template>
    <template #fallback>
      <UiSkeleton class="h-80 sm:h-38 lg:h-24" />
    </template>
  </Suspense> -->
</template>
