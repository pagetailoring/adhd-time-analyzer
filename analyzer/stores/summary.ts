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

  function updateSummary(logs: TimeLog[]) {
    const summaryMap: Record<string, number> = {}
    for (const log of logs) {
      const cat = log.act?.toLowerCase()
      if (!cat) continue
      summaryMap[cat] = (summaryMap[cat] ?? 0) + log.dur
    }
    summary.value.forEach((item: SummaryItem) => {
      item.totalTime = summaryMap[item.label] ?? 0
    })
    console.log('🔄')
  }

  const data = computed<SummaryItem[]>(() =>
    // Computed filtered data (exclude items with zero totalTime)
    summary.value.filter((item: SummaryItem) => item.totalTime > 0)
  )

  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())
  const effectiveDayStart = useEffectiveDayStart(timeLogsToDisplay.value)

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
  }
})
