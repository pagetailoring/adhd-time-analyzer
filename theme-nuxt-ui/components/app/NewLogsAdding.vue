<script lang="ts" setup>
const { shouldTriggerLoad = false } = defineProps<{
  shouldTriggerLoad?: boolean
}>()

const isShortcutsBar = ref(false)
const emit = defineEmits<{ (event: 'isReady'): void }>()

function afterFormMounted() {
  isShortcutsBar.value = true
  emit('isReady')
}

const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())
const disabled = computed(() => !isTodayDataDisplayed.value)
</script>

<template>
  <Suspense>
    <template #default>
      <LazyNewLogsFastShortcuts v-if="isShortcutsBar" :disabled class="sc1:h-10 h-20" />
      <UiSkeleton v-else class="sc1:h-10 h-20" />
    </template>
    <template #fallback>
      <UiSkeleton class="sc1:h-10 h-20" />
    </template>
  </Suspense>

  <Suspense>
    <template #default>
      <LazyNewLogsAddForm v-if="shouldTriggerLoad" :disabled @is-mounted="afterFormMounted" />
      <UiSkeleton v-else class="h-80 sm:h-38 lg:h-24" />
    </template>
    <template #fallback>
      <UiSkeleton class="h-80 sm:h-38 lg:h-24" />
    </template>
  </Suspense>
</template>
