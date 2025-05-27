export const useDayTablesCacheBufferStore = defineStore('tablesBuffer', () => {
  const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())
  const { days: tablesByDay } = storeToRefs(useAnalyzerMemoryStore())

  const isDayInTableCache = computed<boolean>(
    () => Array.isArray(tablesByDay?.value[dayToDisplayDate.value]) ?? false
  )

  return { isDayInTableCache }
})
