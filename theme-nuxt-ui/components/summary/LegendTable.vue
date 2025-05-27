<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { ColumnSort } from '@tanstack/vue-table'

const { data } = storeToRefs(useAnalyzerSummaryStore())
const debounced = useDebounce(data, 300)

const columns = computed<TableColumn<SummaryItem>[]>(() => {
  const meta = { class: { td: 'text-center', th: 'text-center' } }
  return [
    { accessorKey: 'label', header: '', meta },
    { accessorKey: 'totalTime', header: '', id: 'totalTime', meta },
  ]
})

const defaultSortingStats: ColumnSort[] = [{ id: 'totalTime', desc: true }]

const { ping } = useProcessingState()
watch(debounced, () => ping('legend'))

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <small class="up mt-3 -mb-6 opacity-70">
    <small>LEGEND</small>
  </small>

  <UTable :data="debounced" :columns="columns" :sorting="defaultSortingStats" class="mb-2">
    <template #label-cell="{ row }">
      <span class="flex items-center">
        <span class="mr-3 h-4 w-4 rounded-full" :style="`background: ${row.original.color}`" />
        <span class="-ml-1 w-min min-w-14 text-center text-xs whitespace-normal uppercase">
          {{ row.original.label }}
        </span>
      </span>
    </template>
  </UTable>
</template>
