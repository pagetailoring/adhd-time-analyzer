const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerDeleteInDatabase() : null

export const useAnalyzerDeleteStore = defineStore('logsDelete', () => {
  const store = useAnalyzerViewStore()
  const { timeLogsToDisplay } = storeToRefs(store)
  const buff = useAnalyzerBufferStore()
  const { displayDelete } = useNotifications()

  function remove(id: string, info?: string) {
    // remove from UI and cache immediately
    timeLogsToDisplay.value = timeLogsToDisplay.value.filter((log) => log.id !== id)
    buff.deleteFromToday(id)
    displayDelete(`${info ?? id} removed`)

    if (IS_EXTERNAL_DB && useExternal) {
      const { removeInDb } = useExternal()
      removeInDb(id, store.path)
    }
  }

  return { remove }
})
