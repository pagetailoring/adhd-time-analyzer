export const useUserAuthState = defineStore('auth', () => {
  const userUid = ref<string>('')
  const isAuthCheck = ref<boolean>(false)

  return { isAuthCheck, userUid }
})
