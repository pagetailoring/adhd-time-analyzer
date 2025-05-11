const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerReadInDatabase() : null

export const useAnalyzerRead = () => {
  const { logs } = storeToRefs(useAnalyzerMemoryStore())
  const { addLogsToCacheWithDelay, upsertLogsInCache, removeLogFromCache } = useCacheBufferMethods()

  const message = '🔄 read:'

  async function fetchDatabaseData(date: string, path: string): Promise<TimeLog[]> {
    console.log(message, 'fetch from db')
    if (IS_EXTERNAL_DB && useExternal) {
      const { fetchFromDatabase } = useExternal()
      const fresh = await fetchFromDatabase(date, path)
      return fresh
    }
    return []
  }

  // @todo read logic -- make ne composable

  async function fetchDayData(
    date: string,
    path: string = 'logs',
    forceDbFetch = false
  ): Promise<TimeLog[]> {
    const cached = logs.value[date]
    if (cached) {
      if (forceDbFetch && IS_EXTERNAL_DB) {
        setTimeout(async () => {
          // Force DB fetch after a delay to allow all memory operations to complete first
          const dataToCheck = await fetchDatabaseData(date, path)
          if (dataToCheck.length) {
            useAnalyzerBufferDayLogsFetchDbOps(
              dataToCheck,
              cached,
              upsertLogsInCache,
              removeLogFromCache
            )
          }
        }, 200)
      }
      console.log(message, cached.length)
      return cached
    }

    const fresh = await fetchDatabaseData(date, path)
    // @todo @to check
    addLogsToCacheWithDelay(fresh, date)
    return fresh
  }

  return { fetchDayData }
}
