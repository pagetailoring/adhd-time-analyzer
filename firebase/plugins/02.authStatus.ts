import { onAuthStateChanged } from 'firebase/auth'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const { $auth } = useNuxtApp()
  const { userUid, isAuthCheck } = storeToRefs(useUserAuthState())
  const confirmCheck = () => (isAuthCheck.value = true)

  if ($auth) {
    onAuthStateChanged($auth, (user) => {
      userUid.value = user ? user.uid : ''
      console.log(userChecked)
      setTimeout(() => confirmCheck())
    })
  } else {
    console.warn(noAuthInit)
    confirmCheck()
  }
})
