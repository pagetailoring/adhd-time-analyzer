<script setup lang="ts">
const { timeLogsToDisplay, isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

const data = ref<TimeLog[]>([])

watch(
  timeLogsToDisplay,
  async () => {
    await nextTick()
    data.value = timeLogsToDisplay.value
  },
  { immediate: true }
)

function noteContent(row: TableRow<TimeLog>): string {
  return row.data.note ?? ''
}

function noteLength(row: TableRow<TimeLog>): number {
  return noteContent(row).length
}

const isNote = (row: TableRow<TimeLog>): boolean => noteLength(row) > 0

const isNoteInTagsSection = (row: TableRow<TimeLog>): boolean =>
  noteLength(row) <= SHORT_NOTE_MAX_LENGTH && isNote(row)

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))

const colorMap: Record<string, string> = {
  secondary: 'help',
  error: 'danger',
  warning: 'warn',
  neutral: 'primary',
  primary: 'success',
}

// Mapping general UiColors to color names used by PrimeVue
const tagColor = computed(() => {
  return (tag: UiColors): string => {
    const colorSlug = getActTagColor(tag)
    const mapped = colorMap[colorSlug]
    return mapped ? mapped : colorSlug
  }
})
</script>

<template>
  <Card class="w-full">
    <template #content>
      <DataTable
        ref="table"
        :value="data"
        :columns="columns"
        :sort-field="defaultSorting[0].field"
        :sort-order="defaultSorting[0].order"
        :empty-message="isTodayDataDisplayed ? 'No today data' : 'No day data'"
        scrollable
        table-style="min-width: 70rem"
        class="main"
      >
        <Column field="ts" header="Log">
          <template #body="{ data: rawData }">
            <small>{{ rawData.ts.slice(0, 5) }}</small>
          </template>
        </Column>

        <Column field="dur" header="Pomodoro">
          <template #body="{ data: rawData }"> {{ rawData.dur }} min. </template>
        </Column>

        <Column field="qr" header="">
          <template #body="{ data: rawData }">
            <Tag v-if="rawData.qr === 0" value="Shallow" severity="info" />
            <Tag v-else-if="rawData.qr === 2" value="Deep" severity="success" />
          </template>
        </Column>

        <Column field="act" header="Main">
          <template #body="{ data: rawData }">
            <Tag :value="rawData.act" :severity="tagColor(rawData.act)" />
          </template>
        </Column>

        <Column field="tags" header="Tags">
          <template #body="slotProps">
            <Tag
              v-for="(tag, idx) in slotProps.data.tags"
              :key="idx"
              :value="tag"
              :severity="tagColor(tag)"
            />
            <Tag
              v-if="isNoteInTagsSection(slotProps)"
              :value="`* ${noteContent(slotProps)}`"
              severity="secondary"
            />
          </template>
        </Column>

        <Column field="note" header="Note">
          <template #body="slotProps">
            <Tag v-if="isNoteInTagsSection(slotProps)" :value="`*`" severity="success" />
            <span v-else-if="isNote(slotProps)">
              <small>({{ noteLength(slotProps) }})</small> {{ noteContent(slotProps) }}
            </span>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
