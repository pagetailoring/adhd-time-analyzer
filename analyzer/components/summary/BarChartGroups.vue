<script lang="ts" setup>
// Access data (summary) from Pinia
const { data } = storeToRefs(useAnalyzerSummaryStore())

// Reactive record of sums by group
const groupSums = ref(getGroupsWithZeroSum())
const { updateGroupSumsIncrementallyOrFully, calculateGroupedArray } =
  useGroupSumsChartMethods(groupSums)

// Watch items for changes and update sums incrementally or fully
watchDebounced(
  data,
  (newData) => {
    updateGroupSumsIncrementallyOrFully(newData)
  },
  { debounce: 200, maxWait: 1200, immediate: true, deep: true }
)

const groupedArray = computed<GroupedBarStats[]>(() => {
  return calculateGroupedArray(groupSums.value)
})

const bckgColor = computed(() => {
  return (group: string): string => {
    return group === 'neutral' ? 'inverted' : group
  }
})

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <section>
    <div
      v-for="{ group, totalTime, percent } in groupedArray"
      :key="group"
      :class="{
        ['ring-' + group]: true,
        'relative my-1 grid rounded-md ring transition-all ring-inset': true,
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
        class="absolute -rotate-90 text-xs whitespace-nowrap"
      >
        {{ percent < 21 ? totalTime + ' m.' : formatTime(totalTime) }}
      </div>
    </div>
  </section>
</template>
