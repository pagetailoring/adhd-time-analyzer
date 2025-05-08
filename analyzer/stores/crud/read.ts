const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerReadInDatabase() : null
const useDbBuffer = IS_EXTERNAL_DB ? () => useDatabaseOperationsBufferStore() : null

export const useAnalyzerFetchStore = defineStore('analyzerFetch', () => {
  const { logs } = storeToRefs(useAnalyzerMemoryStore())
  const { addMany: addManyToCacheBuffer } = useAnalyzerBufferStore()

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

  async function fetchDayData(
    date: string,
    path: string = 'logs',
    forceDbFetch = false
  ): Promise<TimeLog[]> {
    const cached = logs.value[date]
    if (cached) {
      if (forceDbFetch && IS_EXTERNAL_DB && useDbBuffer) {
        setTimeout(async () => {
          // Force DB fetch after a delay to allow all memory operations to complete first
          const { fromDb } = storeToRefs(useDbBuffer())
          fromDb.value = await fetchDatabaseData(date, path)
        }, 200)
      }
      console.log(message, cached.length)
      return cached
    }

    const fresh = await fetchDatabaseData(date, path)
    addManyToCacheBuffer(fresh, date)
    return fresh
  }

  return { fetchDayData }
})
