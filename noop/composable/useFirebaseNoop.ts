export function useUserAuthState() {
  const userUid = ''
  return { userUid }
}

export function useAnalyzerCreateInDatabase() {
  async function saveNew(newRecord: TimeLog) {
    console.log(newRecord)
  }
  return { saveNew }
}

export function useAnalyzerReadInDatabase() {
  async function fetchFromDatabase(date: string, path = 'logs'): Promise<TimeLog[]> {
    console.log(path, date)
    return new Promise((resolve) => resolve([]))
  }
  return { fetchFromDatabase }
}

export function useAnalyzerDeleteInDatabase() {
  function removeInDb(id: string, path: string) {
    console.log(id, path)
  }
  return { removeInDb }
}
