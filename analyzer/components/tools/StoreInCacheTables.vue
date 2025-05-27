<script setup lang="ts">
const { arrayToDisplay, isTodayDataDisplayed: isTodayView } = storeToRefs(useAnalyzerViewStore())

// TABLE
const { isDayInTableCache } = useDayTablesCacheBuffer()
const { storeDayTableInCache } = useDayTablesCacheBuffer()
const messege = 'records to store:'

const debounce = DELAY_THRESHOLD
watchDebounced(
  arrayToDisplay,
  (val) => {
    if (!isTodayView.value && !isDayInTableCache.value && val.length) {
      console.log(cacheIcon, toolsIcon, messege, val.length)
      storeDayTableInCache(val)
    }
    console.log(cacheIcon, toolsIcon, messege, val.length)
  },
  { debounce, immediate: true }
)

onMounted(() => console.log(cacheIcon, toolsIcon, 'Tables -> cache logic'))
</script>

<template>
  <div></div>
</template>
