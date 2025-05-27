<script lang="ts" setup>
// Type for the archive store (lazy loaded)
import type { AnalizerArchiveStatsStore } from 'ANALYZER_LAYER/stores/dynamic/archive'

// Static stores used immediately on page load
const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

// // Lazy loaded store
const { useAnalyzerLiveStatsStore } = await import('ANALYZER_LAYER/stores/lazy/live')
const todayStatsStore = useAnalyzerLiveStatsStore()
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
      const { useAnalyzerArchiveStatsStore } = await import('ANALYZER_LAYER/stores/dynamic/archive')
      archiveStore.value = useAnalyzerArchiveStatsStore()
    }
  },
  { immediate: true }
)

const headers: DataTableHeader = [
  { title: 'DAY', align: 'center' },
  { title: 'STATS', align: 'center' },
]

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <v-card-text>
    <v-data-table
      class="text-caption"
      density="compact"
      :headers
      hide-default-footer
      :items="isTodayDataDisplayed ? todayTableRows : archiveDaysTableRows"
    >
      <template #item="{ item }">
        <tr>
          <td class="text-center">{{ item.label }}</td>
          <td class="text-no-wrap text-center">{{ item.data }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card-text>
</template>
