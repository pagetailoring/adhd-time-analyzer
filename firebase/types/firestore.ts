import type { FirebaseError } from 'firebase/app'

export type FirestoreOperationResult = {
  success: boolean
  error?: FirebaseError | unknown
}
