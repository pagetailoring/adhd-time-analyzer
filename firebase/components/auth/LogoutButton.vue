<script lang="ts" setup>
import { signOut } from 'firebase/auth'

const { userUid } = storeToRefs(useUserAuthState())

async function logout() {
  const { $auth } = useNuxtApp()

  await signOut($auth)
  userUid.value = ''
  console.log(logoutSuccess)
}
</script>

<template>
  <UiButton label="logout" @click="logout" />
</template>
