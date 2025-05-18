<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { ColumnSort } from '@tanstack/vue-table'

const { data } = storeToRefs(useAnalyzerSummaryStore())

const rows = computed<SummaryItem[]>(() => data.value.filter((item) => item.totalTime > 0))

const columns = computed<TableColumn<SummaryItem>[]>(() => {
  const meta = { class: { td: 'text-center', th: 'text-center' } }
  return [
    { accessorKey: 'label', header: '', meta },
    { accessorKey: 'totalTime', header: '', id: 'totalTime', meta },
  ]
})

const defaultSortingStats: ColumnSort[] = [{ id: 'totalTime', desc: true }]

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <small class="-mb-6 opacity-70 mt-3">
    <small :class="styleUp">LEGEND</small>
  </small>

  <UTable :data="rows" :columns="columns" :sorting="defaultSortingStats" class="mb-2">
    <template #label-cell="{ row }">
      <span class="flex items-center">
        <span class="mr-3 h-4 w-4 rounded-full" :style="`background: ${row.original.color}`" />
        <span class="text-center text-xs uppercase min-w-14 -ml-1 whitespace-normal w-min">
          {{ row.original.label }}
        </span>
      </span>
    </template>
  </UTable>
</template>
