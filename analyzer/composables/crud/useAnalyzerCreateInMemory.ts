export function useAnalyzerCreateInMemory() {
  function generateNewId(): string {
    const { generateId } = useGenerateId()
    // @todo add check is ID is uniqu. Recurence
    return generateId()
  }

  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())
  const { addOrUpdateLogInCache } = useCacheBufferMethods()

  async function saveNew(newRecord: TimeLog) {
    const { pushNewRecord } = useTimeLogsPush()
    const newId = generateNewId()
    pushNewRecord({ id: newId, ...newRecord }, timeLogsToDisplay)

    await nextTick()
    addOrUpdateLogInCache({ id: newId, ...newRecord })
  }

  return { saveNew }
}
