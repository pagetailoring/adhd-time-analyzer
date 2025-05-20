<script lang="ts" setup>
// Access data (summary) from Pinia
const { data } = storeToRefs(useAnalyzerSummaryStore())

// Reactive record of sums by group
const groupSums = ref(getGroupsWithZeroSum())

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

const bckgColor = computed(() => {
  return (group: string): string => {
    return group === 'neutral' ? 'inverted' : group
  }
})
</script>

<template>
  <div>
    <div
      v-for="{ group, totalTime, percent } in groupedArray"
      :key="group"
      :class="{
        ['ring-' + group]: true,
        'relative grid ring ring-inset my-1 rounded-md': true,
        'items-center justify-items-center overflow-hidden': true,
      }"
      :style="{ height: percent + '%' }"
    >
      <div
        :class="{ ['bg-' + bckgColor(group)]: true }"
        class="absolute size-full opacity-50"
      ></div>
      <div
        v-if="percent > 10"
        :class="{ ['text-' + group]: true }"
        class="absolute whitespace-nowrap -rotate-90 text-xs"
      >
        {{ percent < 21 ? totalTime + ' m.' : formatTime(totalTime) }}
      </div>
    </div>
  </div>
</template>
<!-- helper WIP -->
<!-- <div style="color: white" title="@todo remove it">{{ percent }} %</div> -->
