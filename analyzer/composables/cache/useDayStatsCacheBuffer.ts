export function useDayStatsCacheBuffer() {
  const { isCachedGroupedBarStats, dayStatsFromCache, isDayInStatsCache } = storeToRefs(
    useDayStatsCacheBufferStore()
  )

  function storeDayGroupedBarStatsCache(table: GroupedBarStats[]) {
    if (!isDayInStatsCache.value && !isCachedGroupedBarStats.value)
      console.log(cacheIcon, toolsIcon, 'no day inited in cache', table.length)
    else if (!isCachedGroupedBarStats.value && table.length) {
      dayStatsFromCache.value.grouped = table
      console.log(cacheIcon, saveIcon, 'GroupedBarStats[] cached')
    }
  }

  return { storeDayGroupedBarStatsCache }
}
