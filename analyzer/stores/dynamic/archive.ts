export const useAnalizerArchiveStatsStore = defineStore('archiveStats', () => {
  const { effectiveDayStart, dayStartAt, totalTrackedMinutes, totalTrackedTime } =
    storeToRefs(useAnalyzerSummaryStore())
  const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())

  const effectiveDayEnd = computed<Date | null>(() => {
    if (isTodayDataDisplayed.value || !effectiveDayStart.value) return null
    return new Date(effectiveDayStart.value.getTime() + totalTrackedMinutes.value * 60_000)
  })

  const dayEndsAt = computed<string>(() => {
    const end = effectiveDayEnd.value
    return end ? useDateFormat(end, 'HH:mm').value : '—'
  })

  const archiveDaysTableRows = computed<StatsTabbleRow[]>(() => {
    if (isTodayDataDisplayed.value) return []

    return [
      { label: 'start at:', data: dayStartAt.value },
      { label: 'tracked:', data: totalTrackedTime.value, color: 'text' },
      { label: 'tracked:', data: `${totalTrackedMinutes.value} min.` },
      { label: 'end at:', data: dayEndsAt.value },
    ]
  })

  return { archiveDaysTableRows }
})

export type AnalizerArchiveStatsStore = ReturnType<typeof useAnalizerArchiveStatsStore>
