<script lang="ts" setup>
// Type for the archive store (lazy loaded)
import type { AnalizerArchiveStatsStore } from 'analyzer/stores/dynamic/archive'

// Static stores used immediately on page load
const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

// Lazy loaded store
const { useAnalizerLiveStatsStore } = await import('analyzer/stores/lazy/live')
const todayStatsStore = useAnalizerLiveStatsStore()
const { todayTableRows } = storeToRefs(todayStatsStore)

// Store instance will be loaded only when needed
const archiveStore = ref<AnalizerArchiveStatsStore | null>(null)

// Reactive computed fallback to an empty array when store is not yet available
const archiveDaysTableRows = computed(() =>
  archiveStore.value ? storeToRefs(archiveStore.value).archiveDaysTableRows.value : []
)

// Watcher triggers lazy loading of the archive store only when archive data is needed
watch(
  isTodayDataDisplayed,
  async (isToday) => {
    if (!isToday && !archiveStore.value) {
      const { useAnalizerArchiveStatsStore } = await import('analyzer/stores/dynamic/archive')
      archiveStore.value = useAnalizerArchiveStatsStore()
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
    class="min-w-42"
  />
</template>
