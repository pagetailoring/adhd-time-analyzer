<script lang="ts" setup>
const { userUid, isAuthCheck } = storeToRefs(useUserAuthState())
const isDelay = ref(true)

onMounted(() => {
  setTimeout(() => {
    isDelay.value = false
  }, consoleLegalDelay)
})
</script>

<template>
  <div>
    <AuthLoading v-if="!isAuthCheck" />
    <LazyAuthLoginForm v-else-if="!userUid" />
    <template v-if="userUid">
      <LazyAppTheContainer />
    </template>
    <LazyConsoleLicenseInfo v-if="!isDelay" />
  </div>
</template>
