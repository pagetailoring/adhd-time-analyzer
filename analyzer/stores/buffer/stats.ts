export const useDayStatsCacheBufferStore = defineStore('statsBuffer', () => {
  const { stats } = storeToRefs(useAnalyzerMemoryStore())
  const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())

  const isDayInStatsCache = computed<boolean>(
    () => !!(stats.value && stats.value[dayToDisplayDate.value])
  )
  const dayStatsFromCache = computed<StatsBuffer>(() => stats.value?.[dayToDisplayDate.value] ?? {})

  const isCachedGroupedBarStats = computed<boolean>(() =>
    Boolean(stats.value?.[dayToDisplayDate.value]?.grouped)
  )

  return {
    isDayInStatsCache,

    dayStatsFromCache,
    isCachedGroupedBarStats,
  }
})
