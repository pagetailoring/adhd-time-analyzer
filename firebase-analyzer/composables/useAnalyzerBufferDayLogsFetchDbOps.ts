/**
 * ⭐️
 * Analyzer Buffer Day Logs new Fetched data from Databese Operations
 *
 */

// ⭐️ Analysis methods
function getNewToAdd(dataToCheck: TimeLog[], cached: TimeLog[]) {
  const cachedIds = new Set(cached.map((i) => i.id))
  return dataToCheck.filter((i) => !cachedIds.has(i.id))
}
function getNewToRemove(dataToCheck: TimeLog[], cached: TimeLog[]) {
  const freshIds = new Set(dataToCheck.map((i) => i.id))
  return cached.filter((i) => !freshIds.has(i.id))
}

// helper for notifications DRY
const logWord = (count: number): string => ` log${count > 1 ? 's' : ''} `

export const useAnalyzerBufferDayLogsFetchDbOps = async (
  dataToCheck: TimeLog[], // fresh data from DB
  cached: TimeLog[], // cached data in local storage for this day

  // methods for handling local storage cache
  upsertLogsInCache: (newEntries: TimeLog[]) => void,
  removeLogFromCache: (id?: string) => void
) => {
  // methods for handling view data
  const { start, done } = useProcessingState()
  start('bufferDB')
  const { processIncomingData } = useAnalyzerViewStore()
  const { remove } = useAnalyzerDelete()

  // @todo make adnostic from ui notyfications buffer
  const { display, displayDelete } = useNotifications()

  // perform diff analysis
  const additions = getNewToAdd(dataToCheck, cached)
  const removals = getNewToRemove(dataToCheck, cached)

  if (additions.length) {
    const sorted = sortTimeLogs(additions)

    // refreshing view data
    processIncomingData(sorted)

    // updating memory cache in local storage data
    await nextTick()
    upsertLogsInCache(sorted)

    await nextTick()
    const count = sorted.length
    const message = `Fetched ${count}${logWord(count)}from the DB ` + fireIcon
    display(message)
    console.log(fireIcon, '🟢', message)
  }

  if (removals.length) {
    const sorted = sortTimeLogs(removals)

    // refreshing view data
    const isNotification = false
    for (const entry of sorted) remove(entry.id, '', isNotification)

    // updating memory cache in local storage data
    await nextTick()
    for (const entry of sorted) removeLogFromCache(entry.id)

    console.log('!!!!!!!!!!!!!!!!')
    console.log(removals)

    await nextTick()
    const count = sorted.length
    const message = `${count}${logWord(count)}removed during DB sync ` + fireIcon
    displayDelete(message, 6000)
    console.log(fireIcon, '🔴', message)
  }

  done('bufferDB')
}
