export const useAnalyzerBufferStore = defineStore('buffer', () => {
  const icon = '🧠'

  const { logs } = storeToRefs(useAnalyzerMemoryStore())
  const bufferDelay = 200

  watchImmediate(logs, (val) => {
    if (val && Object.keys(val).length > 0) console.log(icon, '✔️')
  })

  function normalizeLog(log: TimeLog): TimeLog {
    const { userId, ...rest } = log as TimeLog
    return { ...rest } as TimeLog
  }

  function normalizeLogs(logsArr: TimeLog[]): TimeLog[] {
    return logsArr.map((entry) => {
      const { userId, sort, ...rest } = entry as TimeLog
      return { ...rest, sort: Number(sort) } as TimeLog
    })
  }

  async function executeDelayedTasks(newEntrie: TimeLog[], dayDate: string) {
    await nextTick()
    newEntrie = normalizeLogs(newEntrie)

    await nextTick()
    logs.value = { ...logs.value, [dayDate]: newEntrie }
  }

  async function addMany(newEntrie: TimeLog[], dayDate: string) {
    setTimeout(() => executeDelayedTasks(newEntrie, dayDate), bufferDelay)
  }

  function addEntries(newEntries: TimeLog[]) {
    for (const entry of newEntries) addOrUpdateOne(entry)
  }

  async function addManySafe(newEntries: TimeLog[]) {
    setTimeout(() => addEntries(newEntries), bufferDelay)
  }

  async function addOrUpdateOne(entry: TimeLog) {
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

  function deleteFromToday(id: string) {
    console.log('\n\n\n')
    console.log(icon, 'delete in memory')
    const day = logs.value[today.value]
    if (!day) return

    console.log(icon, 'day in memory')
    const count = logs.value[today.value].length
    if (logs.value[today.value]) {
      logs.value[today.value] = logs.value[today.value].filter((log: TimeLog) => log.id !== id)
      const after = logs.value[today.value].length
      if (after === count) console.log(icon, icon, 'recorde to delete not found', piniaWrong)
    }
    console.log('\n\n\n')
  }

  return { addManySafe, addMany, addOrUpdateOne, deleteFromToday }
})
