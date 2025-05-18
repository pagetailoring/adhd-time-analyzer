<script lang="ts" setup>
const store = useAnalyzerViewStore()
function consoleStore() {
  console.log('\n\n\n')

  const userState = useUserAuthState()
  console.log('main store:', store)
  console.log('user:', userState)

  const summary = useAnalyzerSummaryStore()
  console.log('summary data:', summary)
  const { today } = storeToRefs(useClockStore())
  const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())
  console.log('display:', dayToDisplayDate.value)
  console.log('today:', today.value)

  const memory = useAnalyzerMemoryStore()
  console.log('memory:', memory.logs)

  console.log('\n\n\n\n')
}
</script>

<template>
  <UTooltip text="console @dev">
    <UiButton trailing-icon="mdi-light:console" @click="consoleStore()" />
  </UTooltip>
</template>
