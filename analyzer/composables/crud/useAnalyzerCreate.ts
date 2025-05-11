const useCreate = IS_EXTERNAL_DB
  ? () => useAnalyzerCreateInDatabase()
  : () => useAnalyzerCreateInMemory()

export const useAnalyzerCreate = () => {
  function saveNew(newRecord: TimeLog) {
    const { saveNew: save } = useCreate()
    save(newRecord)
  }

  return { saveNew }
}
