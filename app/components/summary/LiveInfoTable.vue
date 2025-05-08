<script lang="ts" setup>
const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())
const { todayTableRows } = storeToRefs(useAnalizerLiveStatsStore())
const { archiveDaysTableRows } = storeToRefs(useAnalizerArchiveStatsStore())

// configuration in ~/utils/config-stats-table.ts
const columns = statsColumns
</script>

<template>
  <UTable
    :data="isTodayDataDisplayed ? todayTableRows : archiveDaysTableRows"
    :columns
    class="min-w-42"
  />
</template>
