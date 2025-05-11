<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'

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

// extreact or not @check
function asTimeLogRow(row: Row<TimeLog>): Row<TimeLog> {
  return row as Row<TimeLog>
}

function rowItemsFor(row: Row<TimeLog>) {
  return getRowItems((log: TimeLog) => remove(log.id!, log.act!), display)(row as Row<TimeLog>)
}

// function copyTagsToForm(row: Row<unknown>) {
//   const form = useAnalyzerFormStore()
//   form.tags = row.getValue('tags')
// }

const { isNote, isNoteInTagsSection, noteLength, noteContent } = useNoteContent()

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

    <template #qr-cell="{ row }">
      <UBadge v-if="asTimeLogRow(row).original.qr === 0" label="Shallow" />
      <UBadge v-else-if="asTimeLogRow(row).original.qr === 2" color="success" label="Deep" />
    </template>

    <template #act-cell="{ row }">
      <UBadge :class="styleUp" :color="getActColor(asTimeLogRow(row).original.act) as NuxtUiColor">
        {{ asTimeLogRow(row).original.act }}
      </UBadge>
    </template>

    <template #tags-cell="{ row }">
      <UBadge
        v-for="(tag, idx) in asTimeLogRow(row).original.tags"
        :key="idx"
        size="sm"
        :color="getActColor(tag)"
        class="my-1 mx-1"
        :class="[styleUp]"
        :label="tag"
      />
      <!-- @click="copyTagsToForm(row)" @todo with lazy loading -->
      <UBadge
        v-if="isNoteInTagsSection(row)"
        size="sm"
        color="neutral"
        class="my-1 mx-1"
        :class="[styleUp]"
        :label="`* ${noteContent(row)}`"
      />
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
