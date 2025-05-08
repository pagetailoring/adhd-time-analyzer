export const useDatabaseOperationsBufferStore = defineStore('dbBuffer', () => {
  //
  const fromDb = ref<TimeLog[]>([])
  const toAdd = ref<TimeLog[]>([])
  const toRemove = ref<TimeLog[]>([])

  // 🍍 Main display state ---
  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())

  function analizeDiffrecies(fresh: TimeLog[]) {
    const current = timeLogsToDisplay.value || []
    const freshIds = new Set(fresh.map((i) => i.id))
    const currentIds = new Set(current.map((i) => i.id))
    toAdd.value = fresh.filter((i) => !currentIds.has(i.id))
    toRemove.value = current.filter((i) => !freshIds.has(i.id))
    fromDb.value = [] as TimeLog[]
  }

  watchArray(fromDb, (_val, _old, added) => {
    if (added.length) analizeDiffrecies(added)
  })

  // 🍍 helper to push via shallowRef table updates
  // const { pushNewRecords } = useTimeLogsPush()
  // const { display } = useNotifications()
  // // addManySafe
  // const memory = useAnalyzerBufferStore()

  watch(toAdd, (logsList) => {
    if (logsList.length) {
      const messege = `adding: ${logsList.length} logs from DB`
      console.log(fireIcon, '🟢 ', messege)
      console.log(fireIcon, 'to handle, to add')

      // @todo chekc to add to view or only to mory??
      // check wih memory?
      //  fix: add logic to analyze data downloaded with delay

      // pushNewRecords(logsList, timeLogsToDisplay)
      // display(messege)
      // memory.addManySafe(logsList)
    }
  })

  watch(toRemove, (logsList) => {
    if (logsList.length) console.log(fireIcon, '🔴 to remove:', logsList)
  })

  return { fromDb }
})
