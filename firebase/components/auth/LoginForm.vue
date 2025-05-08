<script lang="ts" setup>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

const email = ref<string>('')
const password = ref<string>('')
const isSuccess = ref<boolean>(false)
const error = ref<string>('')
const { userUid } = storeToRefs(useUserAuthState())

watch(error, (val) => {
  if (val) {
    password.value = ''
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }
})

const { $auth } = useNuxtApp()
async function login(email: string, password: string): Promise<void> {
  error.value = ''
  isSuccess.value = false
  try {
    await signInWithEmailAndPassword($auth, email, password)
    isSuccess.value = true
  } catch (err) {
    if (err instanceof FirebaseError) {
      error.value = err.code
      console.log(err.message)
    } else {
      console.log(err)
      error.value = loginUnable
    }
  } finally {
    if (isSuccess.value) console.log(loginSuccess)
  }
}

const handleForm = async (): Promise<void> => {
  await login(email.value, password.value)
}
</script>

<template>
  <div
    style="
      height: 90dvh;
      width: 100%;
      justify-items: center;
      align-content: center;
      text-align: center;
    "
  >
    <form
      v-if="!userUid"
      style="display: grid; max-width: 16rem; gap: 1rem"
      @submit.prevent="handleForm"
    >
      <UiAuthInput
        v-model="email"
        label="Email"
        name="email"
        type="email"
        placeholder="Email used to sign in"
        autocomplete="email"
        required
      />
      <UiAuthInput
        v-model="password"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        autocomplete="current-password"
        required
      />
      <UiAuthButton type="submit" :style="{ background: error ? 'darkred' : '' }">
        {{ error || 'LOGIN' }}
      </UiAuthButton>
    </form>
  </div>
</template>
