const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerCreateInDatabase() : null
// const useExternal = IS_EXTERNAL_DB ? () => useAnalyzerCreateInDatabase() : null

export const useAnalyzerCreateStore = defineStore('create', () => {
  function generateNewId(): string {
    const { generateId } = useGenerateId()
    // @todo add check is ID is uniqu.
    return generateId()
  }

  const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())
  const buff = useAnalyzerBufferStore()

  async function saveLocalOnly(newRecord: TimeLog) {
    const { pushNewRecord } = useTimeLogsPush()
    const newId = generateNewId()
    pushNewRecord({ id: newId, ...newRecord }, timeLogsToDisplay)

    await nextTick()
    buff.addOrUpdateOne({ id: newId, ...newRecord })
  }

  function saveNew(newRecord: TimeLog) {
    console.log(piniaIcon + 'save new', newRecord)
    if (IS_EXTERNAL_DB && useExternal) {
      const { saveNew: save } = useExternal()
      save(newRecord)
    } else saveLocalOnly(newRecord)
  }

  return { saveNew }
})
