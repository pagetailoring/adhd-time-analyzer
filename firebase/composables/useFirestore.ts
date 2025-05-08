import { getFirestore } from 'firebase/firestore'
import { getApp } from 'firebase/app'

console.log('👾 db...')

export function useFirestore() {
  const db = getFirestore(getApp())

  return { db }
}
