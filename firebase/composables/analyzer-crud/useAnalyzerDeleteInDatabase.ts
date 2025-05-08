export function useAnalyzerDeleteInDatabase() {
  function removeInDb(id: string, path: string) {
    const { deleteRec } = useDeleteRecordInFirestore()
    deleteRec(id, path)
  }

  return { removeInDb }
}
