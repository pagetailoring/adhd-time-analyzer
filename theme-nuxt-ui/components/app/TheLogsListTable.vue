<script setup lang="ts">
// Check tables grouped by day CACHE data in Local storge
const { isDayInTableCache, dayTableFromCache } = useDayTablesCacheBuffer()

const { arrayToDisplay, isTodayDataDisplayed: isTodayView } = storeToRefs(useAnalyzerViewStore())
const table = useTemplateRef('table')

const data = computed(() => {
  if (!isTodayView.value && isDayInTableCache.value) return dayTableFromCache.value
  return arrayToDisplay.value
})

/**
 * ⭐️ Main table config is extracted to:
 * @see ~/utils/config/
 *
 * table-main-pinning.ts, table-main-columns.ts,
 * table-main-act-color.ts, table-main-row-items.ts,
 * table-main-sorting.ts
 */

const columnVisibility = computed(() => {
  return { id: false, sort: false, date: false, userId: false, timeAgo: isTodayView.value }
})

const { display } = useNotifications()
const { remove } = useAnalyzerDelete()

function rowItemsFor(row: TableRow<TimeLog>) {
  return getRowItems((log: TimeLog) => remove(log.id!, log.act!), display)(row as TableRow<TimeLog>)
}

function noteContent(row: TableRow<TimeLog>): string {
  return row.getValue('note') || ''
}

function noteLength(row: TableRow<TimeLog>): number {
  const note = noteContent(row) as string
  return note && note.length ? note.length : 0
}

const isNote = (row: TableRow<TimeLog>): boolean => !(noteLength(row) === 0)

const isNoteInTagsSection = (row: TableRow<TimeLog>): boolean =>
  noteLength(row) <= SHORT_NOTE_MAX_LENGTH && isNote(row)

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))

// @dev - to test stats cache
const totalDuration = computed(() => data.value.reduce((sum, log) => sum + log.dur, 0))
</script>

<template>
  <UTable
    ref="table"
    :data
    :columns="columns"
    :sorting="defaultSorting"
    :column-visibility="columnVisibility"
    :column-pinning="columnPinning"
    class="border"
    :empty="isTodayView ? 'No today data' : 'No day data'"
  >
    <template #dur-header>
      <span class="up">Pomo<wbr />doro</span>
    </template>

    <template #act-cell="{ row }">
      <UBadge class="up" :color="getActTagColor(row.original.act) as NuxtUiColor">
        {{ row.original.act }}
      </UBadge>
    </template>

    <template #tags-header>
      <span class="up">TAGS </span>
      <span class="lowercase">({{ totalDuration }} min.)</span>
    </template>

    <template #tags-cell="{ row }">
      <LazyElementCopyTagsFromLog :tags="row.original.tags">
        <UBadge
          v-if="row.original.qr === 0 || row.original.qr === 2"
          size="sm"
          :color="row.original.qr === 0 ? 'neutral' : 'success'"
          class="up mx-1 my-1"
          :label="row.original.qr === 0 ? '*Shallow' : '*Deep'"
        />
        <UBadge
          v-for="(tag, idx) in row.original.tags"
          :key="idx"
          size="sm"
          :color="getActTagColor(tag)"
          class="up mx-1 my-1"
          :label="tag"
        />
        <UBadge
          v-if="isNoteInTagsSection(row)"
          size="sm"
          color="secondary"
          class="up mx-1 my-1"
          :label="`*${noteContent(row)}`"
        />
      </LazyElementCopyTagsFromLog>
    </template>

    <template #note-cell="{ row }">
      <template v-if="isNote(row)">
        <UBadge v-if="isNoteInTagsSection(row)" label="*" size="sm" color="success" />
        <span v-else>
          <small>({{ noteLength(row) }}) </small>
          <span>{{ noteContent(row) }}</span>
        </span>
      </template>
    </template>

    <template v-if="isTodayView" #actions-cell="{ row }">
      <LazyThemeDropdownTable :items="rowItemsFor(row)" empty="Brak danych do wyświetlenia" />
    </template>
  </UTable>
</template>
