export function useAnalyzerReadInDatabase() {
  const user = useUserAuthState()

  /**
   * Fetches data from Firestore under `path` and `date` for user.userUid.
   */

  const message = fireIcon + piniaIcon + ' fetched:'

  async function fetchFromDatabase(date: string, path = 'logs'): Promise<TimeLog[]> {
    const dayToLoad = ref(date)
    const { data, pending } = useFirestoreFetch<TimeLog>(path, user.userUid, dayToLoad)

    return new Promise((resolve) => {
      watch(pending, (val) => {
        console.log(message, data.value.length, pending.value ? 'pending' : 'done')
        if (!val) resolve(data.value)
      })
    })
  }

  return { fetchFromDatabase }
}
