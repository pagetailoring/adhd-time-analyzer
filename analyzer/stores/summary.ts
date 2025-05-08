export const useAnalyzerSummaryStore = defineStore('summary', () => {
  /**
   * Summary store: calculates stats for the current effective day
   */

  const summary = ref<SummaryItem[]>(
    mainActivityTagsFlat.map((label, i) => ({
      label,
      totalTime: 0,
      color: mainActivityColors[i],
    }))
  )

  // Computed total minutes from start of effective day
  const totalTrackedMinutes = computed(() =>
    summary.value.reduce((sum: number, item: SummaryItem) => sum + item.totalTime, 0)
  )
  // Formatted total (e.g., "2h 15m")
  const { get: formatTime } = useFormattedTime()
  const totalTrackedTime = computed(() => formatTime(totalTrackedMinutes.value))

  // Flag indicating summary has been computed at least once
  const isSummaryReady = ref<boolean>(false)

  function updateSummary(logs: TimeLog[]) {
    console.log('💹..')
    const summaryMap: Record<string, number> = {}
    for (const log of logs) {
      const cat = log.act?.toLowerCase()
      if (!cat) continue
      summaryMap[cat] = (summaryMap[cat] ?? 0) + log.dur
    }
    summary.value.forEach((item: SummaryItem) => {
      item.totalTime = summaryMap[item.label] ?? 0
    })
    isSummaryReady.value = true
  }

  const data = computed<SummaryItem[]>(() =>
    // Computed filtered data (exclude items with zero totalTime)
    summary.value.filter((item: SummaryItem) => item.totalTime > 0)
  )

  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())

  const effectiveDayStart = useEffectiveDayStart(timeLogsToDisplay)

  const dayStartAt = computed(() =>
    effectiveDayStart.value
      ? useDateFormat(effectiveDayStart as ComputedRef<Date>, 'HH:mm').value
      : '—'
  )

  // 💹 Update values when a new Time Log is added. ⭐️ Main stats trigger
  watchImmediate(timeLogsToDisplay, (logs) => updateSummary(logs))

  return {
    data,
    summary,
    totalTrackedMinutes,
    totalTrackedTime,
    effectiveDayStart,
    dayStartAt,

    isSummaryReady,
  }
})
