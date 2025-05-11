<script lang="ts" setup>
// Access data (summary) from Pinia
const { data } = storeToRefs(useAnalyzerSummaryStore())

// Reactive record of sums by group
const groupSums = ref<Record<string, number>>({
  success: 0,
  info: 0,
  warning: 0,
  inverted: 0,
})

// Internal previous state for incremental updates
let previousData: SummaryItem[] = []

const { addNewLabelToGroupSum, applyLabelDeltaToGroupSum, recalculateAllGroupTotals } =
  useGroupSumsChartMethods(groupSums)

// Watch items for changes and update sums incrementally or fully
watch(
  () => data.value,
  (newData) => {
    // Case: exact one value changed
    if (newData.length === previousData.length) {
      for (let i = 0; i < newData.length; i++) {
        const newItem = newData[i]
        const oldItem = previousData[i]
        if (newItem.label === oldItem.label && newItem.totalTime !== oldItem.totalTime) {
          applyLabelDeltaToGroupSum(newItem.label, oldItem.totalTime, newItem.totalTime)
          previousData = [...newData]
          return
        }
      }
    }

    // Case: one item added
    if (newData.length === previousData.length + 1) {
      const added = newData.find(
        (item) =>
          !previousData.some((old) => old.label === item.label && old.totalTime === item.totalTime)
      )
      if (added) {
        addNewLabelToGroupSum(added.label, added.totalTime)
        previousData = [...newData]
        return
      }
    }

    // Fallback: full recalculation
    recalculateAllGroupTotals(newData)
    previousData = [...newData]
  },
  { immediate: true, deep: true, flush: 'post' }
)

/**
 * Computed array of group sums with percentage of total.
 * @computed groupedArray
 * @returns Array of objects with group, totalTime, and percent fields
 * @keywords computed, percentage, visualization
 */
const groupedArray = computed(() => {
  const total = Object.values(groupSums.value).reduce((acc, val) => acc + val, 0)
  return Object.entries(groupSums.value)
    .filter(([, val]) => val > 0)
    .map(([group, totalTime]) => ({
      group,
      totalTime,
      percent: total ? (totalTime / total) * 100 : 0,
    }))
})

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <div class="absolute z-20 flex h-full w-10 flex-col bg-default px-2 py-1 opacity-60">
    <div
      v-for="item in groupedArray"
      :key="item.group"
      :class="{ ['bg-' + item.group]: true, 'my-1 rounded-sm': true }"
      :style="{ height: item.percent + '%' }"
    />
  </div>
</template>
