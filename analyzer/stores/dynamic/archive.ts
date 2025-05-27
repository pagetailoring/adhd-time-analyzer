export const useAnalyzerArchiveStatsStore = defineStore('archiveStats', () => {
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

    return getSummaryStatsTable(
      dayStartAt.value,
      totalTrackedTime.value,
      totalTrackedMinutes.value,
      dayEndsAt.value
    )
  })

  return { archiveDaysTableRows, dayEndsAt }
})

export type AnalizerArchiveStatsStore = ReturnType<typeof useAnalyzerArchiveStatsStore>
