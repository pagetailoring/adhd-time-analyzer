import type { FirebaseError } from 'firebase/app'

export function useAnalyzerCreateInDatabase() {
  const store = useAnalyzerViewStore()
  const { timeLogsToDisplay } = storeToRefs(store)
  const { pushNewRecord } = useTimeLogsPush()
  const { display, displayError } = useNotifications()
  const buff = useAnalyzerBufferStore()

  const isError = ref<boolean>(false)

  async function saveNew(newRecord: TimeLog) {
    const { save, newId } = useAddFirestore()
    isError.value = false

    try {
      await save(newRecord, store.path)
      if (newId.value) {
        pushNewRecord({ id: newId.value, ...newRecord }, timeLogsToDisplay)
        buff.addOrUpdateOne({ id: newId.value, ...newRecord })
      } else console.log(piniaWrong)
    } catch (err) {
      isError.value = true
      const error = err as FirebaseError
      displayError(fireIcon + piniaIcon + `add error: ${error.message}`)
      console.log(error)
    } finally {
      if (!isError.value) display(`${newRecord.act} saved at ${newRecord.ts}`)
    }
  }

  return { saveNew }
}
