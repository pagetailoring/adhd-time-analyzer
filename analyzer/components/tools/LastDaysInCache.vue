<script setup lang="ts">
const { today } = storeToRefs(useClockStore())
const { logs, days, stats } = storeToRefs(useAnalyzerMemoryStore())

// Amout days to display in select
const totalDays = ref(5)

// type ***

const isInLogsTable = (date: string) => !!(logs.value[date] && logs.value[date].length)
const logsCount = (date: string) => (logs.value[date] ? logs.value[date].length : 0)
const isInDaysTable = (date: string) => !!(days.value[date] && days.value[date].length)
const isInStatsTable = (date: string) => !!stats.value[date]
const daysCount = (date: string) => (days.value[date] ? days.value[date].length : 0)
const icon = (isTrue: boolean) => (isTrue ? '✅' : '⏹️')

const items = computed<DaySelectOption[]>(() => {
  const list = getDaysSelectValues(today.value, totalDays.value)
  list.shift()
  return list
})

const data = computed(() => {
  return items.value.map(({ label, value }) => {
    return {
      day: label,
      stats: icon(isInStatsTable(value)),
      lg: icon(isInLogsTable(value)),
      lc: logsCount(value),
      dys: icon(isInDaysTable(value)),
      dc: daysCount(value),
      date: value,
    }
  })
})
</script>

<template>
  <UiTable :data />
</template>
<!-- <UInputNumber v-model="totalDays" :step="1" size="xs" /> -->

<!-- <template>
  <div>
    <small>day: Logs / days (date)</small>
    <br />
    <span v-for="{ label, value } in items" :key="value">
      <span>{{ label }}: </span>
      <span>{{ icon(isInLogsTable(value)) }} / </span>
      <span>{{ icon(isInDaysTable(value)) }} / </span>
      <span>{{ daysCount(value) }} / </span>
      <span>{{ icon(isInStatsTable(value)) }} / </span>
      <small> ({{ value }})</small>
      <br />
    </span>
  </div>
</template> -->
