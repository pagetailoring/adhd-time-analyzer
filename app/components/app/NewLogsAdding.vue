<script lang="ts" setup>
const { shouldTriggerLoad = false } = defineProps<{
  shouldTriggerLoad?: boolean
}>()

const isShortcutsBar = ref(false)
</script>

<template>
  <Suspense>
    <template #default>
      <LazyNewLogsFastShortcuts v-if="isShortcutsBar" class="h-30 sc2:h-20 sc1:h-10" />
      <ThemeSkeleton v-else class="h-30 sc2:h-20 sc1:h-10" />
    </template>
    <template #fallback>
      <ThemeSkeleton class="h-30 sc2:h-20 sc1:h-10" />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <LazyNewLogsAddForm v-if="shouldTriggerLoad" @is-mounted="isShortcutsBar = true" />
      <ThemeSkeleton v-else class="h-80 sm:h-38 lg:h-24" />
    </template>
    <template #fallback>
      <ThemeSkeleton class="h-80 sm:h-38 lg:h-24" />
    </template>
  </Suspense>
</template>
