import type { FirebaseError } from 'firebase/app'
import { getApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import type { FirestoreOperationResult } from '../types/firestore'

export const useCreateWithCustomId = () => {
  const db = getFirestore(getApp())

  const saveOrOverride = async (
    collectionName: string,
    docId: string,
    data: Record<string, unknown>
  ): Promise<FirestoreOperationResult> => {
    try {
      const docRef = doc(db, collectionName, docId)
      await setDoc(docRef, data)
      return { success: true }
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError
      // if (import.meta.dev) {
      console.error('Firestore setDoc error:', firebaseError.code || error)
      // }
      return { success: false, error: firebaseError }
    }
  }

  return { saveOrOverride }
}
