export function useDayTablesCacheBuffer() {
  const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())
  const { days: tablesByDay } = storeToRefs(useAnalyzerMemoryStore())

  const isDayInTableCache = computed(
    () => !!(tablesByDay.value && tablesByDay.value[dayToDisplayDate.value])
  )
  const dayTableFromCache = computed<TimeLog[]>(
    () => tablesByDay?.value[dayToDisplayDate.value] ?? []
  )

  function storeDayTableInCache(table: TimeLog[]) {
    if (table.length) {
      tablesByDay.value[dayToDisplayDate.value] = table
      console.log(cacheIcon, saveIcon, 'day table cached')
    }
  }

  return { dayTableFromCache, isDayInTableCache, storeDayTableInCache }
}
