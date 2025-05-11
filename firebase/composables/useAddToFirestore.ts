import { getApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import type { FirebaseError } from 'firebase/app'

export function useAddFirestore() {
  const db = getFirestore(getApp())
  const newId = ref<string | null>(null)
  const success = ref<boolean | null>(null)

  // DOCS:
  // https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en
  // https://firebase.google.com/docs/firestore
  // https://firebase.google.com/docs/reference/js/firestore_

  async function save(newRecord: TimeLog, path: string) {
    newId.value = null
    success.value = null

    try {
      // add data to firebase
      const docRef = await addDoc(collection(db, path), newRecord)
      // save id from firestore
      newId.value = `${docRef.id}`
      success.value = true
    } catch (error) {
      console.log('💾 add', error as FirebaseError)
      success.value = false
    } finally {
      if (success.value) console.log('💾 firestore record created')
    }
  }

  return {
    save,

    success,
    newId,
  }
}
