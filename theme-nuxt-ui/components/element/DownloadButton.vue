<script setup lang="ts">
const { logs } = storeToRefs(useAnalyzerMemoryStore())
const { today } = storeToRefs(useClockStore())

function downloadLogs() {
  const json = JSON.stringify(logs.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `logs-backup-${today.value}.json`
  link.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <UiButton icon="material-symbols:download-rounded" @click="downloadLogs" />
</template>
