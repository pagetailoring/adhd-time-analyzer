import { getApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'
import type { Query } from 'firebase/firestore'
import type { FirebaseError } from 'firebase/app'

export function useFirestoreFetch<T>(
  path: string,
  userId: string,
  dateParam: Ref<string | null> | string | null
) {
  const data = ref<T[]>([])
  const pending = ref(false)

  const messages = fireIcon + ' fetch composable'

  // normalize dateParam to a Ref<string>
  const dateRef: Ref<string | null> = isRef(dateParam) ? dateParam : ref(dateParam)

  const db = getFirestore(getApp())
  const whereThisUser = where('userId', '==', userId)
  const collectionRef = collection(db, path)

  const getDataQuery = (): Query => {
    return query(collectionRef, where('date', '==', dateRef.value), whereThisUser)
  }

  const load = async () => {
    pending.value = true

    console.log(fireIcon, 'load', messages)

    try {
      const snapshot = await getDocs(getDataQuery())
      data.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[]

      console.log(
        fireIcon,
        snapshot.empty ? '🔥 🤷‍♂️ no data to fetch' : `🔥 ${snapshot.size} records ✔️ from db`
      )
    } catch (err) {
      console.log(`${path} fetch`, err as FirebaseError)
    } finally {
      pending.value = false
    }
  }

  // auto-load on composable init
  load()

  // re-load whenever dateRef changes
  watch(
    dateRef,
    (val) => {
      if (val !== null) {
        load()
      }
    },
    { flush: 'post' }
  )

  return {
    data,
    pending,
    refresh: load,
  }
}
