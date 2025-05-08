import { getApp } from 'firebase/app'
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import type { FirebaseError } from 'firebase/app'

export function useDeleteRecordInFirestore() {
  const db = getFirestore(getApp())

  // DOCS:
  // https://firebase.google.com/docs/firestore/manage-data/delete-data
  // https://firebase.google.com/docs/firestore
  // https://firebase.google.com/docs/reference/js/firestore_

  async function deleteRec(id: string, path: string) {
    try {
      const docRef = doc(db, path, id)
      await deleteDoc(docRef)
    } catch (err) {
      const fireError = err as FirebaseError
      console.log(deleteError, fireError)
    }
  }

  return { deleteRec }
}
