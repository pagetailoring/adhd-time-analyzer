<script setup lang="ts">
const { timeLogsToDisplay, isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())
const table = useTemplateRef('table')

// @test: experimental approach for delaying table rendering
// @idea: maybe move pushLogic here to have faster count of statystics
//        what would be more consistent and UI-agnostic
const data = ref<TimeLog[]>([])
watch(
  timeLogsToDisplay,
  async () => {
    await nextTick()
    data.value = timeLogsToDisplay.value
  },
  { immediate: true, flush: 'post' }
)

/**
 * ⭐️ Main table config is extracted to:
 * @see ~/utils/config/
 *
 * table-main-pinning.ts, table-main-columns.ts,
 * table-main-act-color.ts, table-main-row-items.ts,
 * table-main-sorting.ts
 */

const columnVisibility = ref({ id: false, sort: false, date: false, userId: false })
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
</script>

<template>
  <UTable
    ref="table"
    :data
    :columns="columns"
    :sorting="defaultSorting"
    :column-visibility="columnVisibility"
    :column-pinning="columnPinning"
    :class="styleBorder"
    :empty="isTodayDataDisplayed ? 'No today data' : 'No day data'"
  >
    <template #dur-header>
      <span :class="styleUp">Pomo<wbr />doro</span>
    </template>

    <template #act-cell="{ row }">
      <UBadge :class="styleUp" :color="getActTagColor(row.original.act) as NuxtUiColor">
        {{ row.original.act }}
      </UBadge>
    </template>

    <template #tags-cell="{ row }">
      <LazyElementCopyTagsFromLog :tags="row.original.tags">
        <UBadge
          v-if="row.original.qr === 0 || row.original.qr === 2"
          size="sm"
          :color="row.original.qr === 0 ? 'neutral' : 'success'"
          class="my-1 mx-1"
          :class="[styleUp]"
          :label="row.original.qr === 0 ? '*Shallow' : '*Deep'"
        />
        <UBadge
          v-for="(tag, idx) in row.original.tags"
          :key="idx"
          size="sm"
          :color="getActTagColor(tag)"
          class="my-1 mx-1"
          :class="[styleUp]"
          :label="tag"
        />
        <UBadge
          v-if="isNoteInTagsSection(row)"
          size="sm"
          color="secondary"
          class="my-1 mx-1"
          :class="[styleUp]"
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

    <template v-if="isTodayDataDisplayed" #actions-cell="{ row }">
      <LazyThemeDropdownTable :items="rowItemsFor(row)" empty="Brak danych do wyświetlenia" />
    </template>
  </UTable>
</template>
