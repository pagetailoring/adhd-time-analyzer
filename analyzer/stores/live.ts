export const useAnalizerLiveStatsStore = defineStore('live', () => {
  const { effectiveDayStart, dayStartAt, totalTrackedMinutes, totalTrackedTime } =
    storeToRefs(useAnalyzerSummaryStore())
  const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())
  const { now } = storeToRefs(useClockStore())
  const { get: formatTime } = useFormattedTime()

  // reactive state for live stats
  const minutesFromDayStart = ref<number>(0)
  const timeFromDayStart = ref<string>('')
  const differenceInMinutes = ref<number>(0)
  const absDifference = ref<number>(0)

  const diffColor = computed<string>(() => {
    const diff = differenceInMinutes.value
    if (diff < -40) return 'text-error'
    if (diff < -24) return 'text-warning'
    if (diff < -11) return 'text-dimmed'
    if (diff > 7) return 'text-success'
    return 'text-muted'
  })

  // recompute every time "live" should update
  watchEffect(() => {
    if (!isTodayDataDisplayed.value || !effectiveDayStart.value) {
      minutesFromDayStart.value = 0
      timeFromDayStart.value = ''
      differenceInMinutes.value = 0
      absDifference.value = 0
      return
    }

    const mins = Math.floor((now.value.getTime() - effectiveDayStart.value.getTime()) / 60_000)
    minutesFromDayStart.value = mins
    timeFromDayStart.value = formatTime(mins)
    differenceInMinutes.value = totalTrackedMinutes.value - mins
    absDifference.value = Math.abs(differenceInMinutes.value)
  })

  const todayTableRows = computed<StatsTabbleRow[]>(() => {
    if (!isTodayDataDisplayed.value) return []

    return [
      { label: 'start at:', data: dayStartAt.value },
      { label: 'ago:', data: timeFromDayStart.value },
      { label: 'tracked:', data: totalTrackedTime.value, color: 'text' },
      { label: 'diff.:', data: `${differenceInMinutes.value} min.`, color: diffColor.value },
      { label: 'tracked:', data: `${totalTrackedMinutes.value} min.` },
      { label: 'ago:', data: `${minutesFromDayStart.value} min.` },
    ]
  })

  return { todayTableRows }
})
