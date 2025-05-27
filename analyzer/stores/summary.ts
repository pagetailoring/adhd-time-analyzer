export const useAnalyzerSummaryStore = defineStore('summary', () => {
  /**
   * Summary store: calculates stats for the current effective day
   */

  const summary = ref<SummaryItem[]>(
    MAIN_ACTIVITY_TAGS_FLAT.map((label, i) => ({
      label,
      totalTime: 0,
      color: MAIN_ACTIVITY_COLORS[i],
    }))
  )

  // Computed total minutes from start of effective day
  const totalTrackedMinutes = computed(() =>
    summary.value.reduce((sum: number, item: SummaryItem) => sum + item.totalTime, 0)
  )

  // Formatted total (e.g., "2h 15m")
  const totalTrackedTime = computed(() => formatTime(totalTrackedMinutes.value))

  const dataCompute = computed<SummaryItem[]>(() =>
    // Computed filtered data (exclude items with zero totalTime)
    summary.value.filter((item: SummaryItem) => item.totalTime > 0)
  )
  const data = useDebounce(dataCompute, 100)

  const { start, done } = useProcessingState()

  function updateSummary(logs: TimeLog[]) {
    start('SUMMARY')
    const summaryMap: Record<string, number> = {}
    for (const log of logs) {
      const cat = log.act?.toLowerCase()
      if (!cat) continue
      summaryMap[cat] = (summaryMap[cat] ?? 0) + log.dur
    }
    summary.value.forEach((item: SummaryItem) => {
      item.totalTime = summaryMap[item.label] ?? 0
    })

    done('SUMMARY')
  }

  const { dayTableFromCache } = useDayTablesCacheBuffer()
  const { isDayInTableCache } = storeToRefs(useDayTablesCacheBufferStore())
  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())

  const dataTable = computed(() => {
    return isDayInTableCache.value ? dayTableFromCache.value : timeLogsToDisplay.value
  })

  const effectiveDayStart = useEffectiveDayStart(dataTable)

  const dayStartAt = computed(() =>
    effectiveDayStart.value
      ? useDateFormat(effectiveDayStart as ComputedRef<Date>, 'HH:mm').value
      : '—'
  )

  // 💹 Update values when a new Time Log is added. ⭐️ Main stats trigger
  watchImmediate(dataTable, (logs) => updateSummary(logs))

  return {
    data,
    summary,
    totalTrackedMinutes,
    totalTrackedTime,
    effectiveDayStart,
    dayStartAt,
  }
})
