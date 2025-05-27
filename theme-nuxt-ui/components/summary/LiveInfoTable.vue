<script lang="ts" setup>
// Type for the archive store (lazy loaded)
import type { AnalizerArchiveStatsStore } from 'ANALYZER_LAYER/stores/dynamic/archive'

// Static stores used immediately on page load
const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

// Lazy loaded store
const { useAnalyzerLiveStatsStore } = await import('ANALYZER_LAYER/stores/lazy/live')
const todayStatsStore = useAnalyzerLiveStatsStore()
const { todayTableRows } = storeToRefs(todayStatsStore)

// Store instance will be loaded only when needed
const archiveStore = ref<AnalizerArchiveStatsStore | null>(null)

// Reactive computed fallback to an empty array when store is not yet available
const archiveDaysTableRows = computed(() => {
  return archiveStore.value ? storeToRefs(archiveStore.value).archiveDaysTableRows.value : []
})

// Watcher triggers lazy loading of the archive store only when archive data is needed
watch(
  isTodayDataDisplayed,
  async (isToday) => {
    if (!isToday && !archiveStore.value) {
      const { useAnalyzerArchiveStatsStore } = await import('ANALYZER_LAYER/stores/dynamic/archive')
      archiveStore.value = useAnalyzerArchiveStatsStore()
    }
  },
  { immediate: true }
)

// Columns configuration for the table in ~/utils/config-stats-table.ts
const columns = statsColumns

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <UTable
    :data="isTodayDataDisplayed ? todayTableRows : archiveDaysTableRows"
    :columns="columns"
    class="bg-default min-w-42"
  />
</template>
