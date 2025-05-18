<script setup lang="ts">
const { data } = storeToRefs(useAnalyzerSummaryStore())

const rows = computed<SummaryItem[]>(() => data.value.filter((item) => item.totalTime > 0))

const sortField = 'totalTime'
const sortOrder = -1 // -1 = desc, 1 = asc

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <Card class="center">
    <template #content>
      <DataTable
        :value="rows"
        :sort-field="sortField"
        :sort-order="sortOrder"
        responsive-layout="scroll"
      >
        <Column header="" :style="{ textAlign: 'center' }">
          <template #body="{ data: rowData }">
            <span
              style="display: inline-block; width: 1em; height: 1em; border-radius: 50%"
              :style="{ background: rowData.color }"
            />
          </template>
        </Column>

        <Column field="label" header="" :style="{ textAlign: 'center' }" sortable />

        <Column field="totalTime" header="" :style="{ textAlign: 'center ' }" sortable>
          <template #body="{ data: rowData }">
            <span class="min"> {{ rowData.totalTime }} min.</span>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
