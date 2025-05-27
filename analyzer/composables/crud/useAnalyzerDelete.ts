const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerDeleteInDatabase() : null

export const useAnalyzerDelete = () => {
  const store = useAnalyzerViewStore()
  const { removeLogFromCache } = useCacheBufferMethods()
  const { timeLogsToDisplay } = storeToRefs(store)
  const { displayDelete } = useNotifications()
  const { trigger } = useProcessingState()

  function remove(id: string | undefined, info?: string, isNotification = true) {
    if (id === undefined) return
    trigger('remove')

    // remove from UI and cache immediately
    timeLogsToDisplay.value = timeLogsToDisplay.value.filter((log) => log.id !== id)
    removeLogFromCache(id)
    if (isNotification) displayDelete(`${info ?? id} removed`)

    if (IS_EXTERNAL_DB && useExternal) {
      const { removeInDb } = useExternal()
      removeInDb(id, store.path)
    }
  }

  return { remove }
}
