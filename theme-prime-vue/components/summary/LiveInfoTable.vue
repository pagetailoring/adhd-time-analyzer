<script setup lang="ts">
const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

// Lazy live stats store (today)
const { useAnalyzerLiveStatsStore } = await import('ANALYZER_LAYER/stores/lazy/live')
const todayStatsStore = useAnalyzerLiveStatsStore()
const { todayTableRows } = storeToRefs(todayStatsStore)

// Lazy archive store
// @ts-expect-error: migration betwen ui libreries - temp
const archiveStore = ref<AnalizerArchiveStatsStore | null>(null)
const archiveDaysTableRows = computed(() =>
  archiveStore.value ? storeToRefs(archiveStore.value).archiveDaysTableRows.value : []
)

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

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <Card class="center">
    <template #content>
      <DataTable :value="isTodayDataDisplayed ? todayTableRows : archiveDaysTableRows">
        <Column field="label" header="Day" />

        <Column header="Stats" class="center">
          <template #body="{ data: row }">
            <div :class="row.color || 'p-text-secondary'" class="min">
              {{ row.data }}
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
