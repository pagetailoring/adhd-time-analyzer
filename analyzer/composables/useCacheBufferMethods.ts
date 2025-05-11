export const useCacheBufferMethods = () => {
  const icon = '🧠'

  const { logs } = storeToRefs(useAnalyzerMemoryStore())
  const bufferDelay = 200

  async function executeDelayedTasks(newEntrie: TimeLog[], dayDate: string) {
    await nextTick()
    newEntrie = normalizeLogs(newEntrie)

    await nextTick()
    logs.value = { ...logs.value, [dayDate]: newEntrie }
  }

  function addLogsToCacheWithDelay(newEntrie: TimeLog[], dayDate: string, delay = bufferDelay) {
    setTimeout(() => executeDelayedTasks(newEntrie, dayDate), delay)
  }

  function upsertLogsInCache(newEntries: TimeLog[]) {
    for (const entry of newEntries) addOrUpdateLogInCache(entry)
  }

  function addOrUpdateLogInCache(entry: TimeLog) {
    const day = logs.value[entry.date]
    if (!day) return
    if (entry.id) {
      const log = normalizeLog(entry)
      const index = logs.value[log.date].findIndex((lg: TimeLog) => lg.id === log.id)
      if (index !== -1) {
        logs.value[log.date][index] = log
      } else {
        logs.value[log.date].push(log)
      }
    }
  }

  const { today } = storeToRefs(useClockStore())

  function removeLogFromCache(id: string | undefined) {
    if (id === undefined) return

    console.log(icon, 'delete in memory')
    const count = logs.value[today.value].length
    if (logs.value[today.value]) {
      logs.value[today.value] = logs.value[today.value].filter((log: TimeLog) => log.id !== id)
      const after = logs.value[today.value].length
      if (after === count) console.log(icon, icon, 'recorde to delete not found', piniaWrong)
    }
  }

  return {
    upsertLogsInCache,
    addLogsToCacheWithDelay,
    addOrUpdateLogInCache,
    removeLogFromCache,
  }
}
