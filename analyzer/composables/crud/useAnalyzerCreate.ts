const useCreate = IS_EXTERNAL_DB
  ? () => useAnalyzerCreateInDatabase()
  : () => useAnalyzerCreateInMemory()

export const useAnalyzerCreate = () => {
  const { displayError } = useNotifications()

  function saveNew(newRecord: TimeLog) {
    if (isTimeLogValid(newRecord)) {
      const { saveNew: save } = useCreate()
      save(newRecord)
    } else {
      const message = 'New logTime not valid, save error'
      displayError(message)
      console.log('\n🔥', message, '\n\n')
    }
  }

  return { saveNew }
}
