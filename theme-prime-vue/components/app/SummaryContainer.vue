<script lang="ts" setup>
const isStatsTable = ref(false)
// const isCharts = ref(false)
const isDoughnutChart = ref(false)

const emit = defineEmits<{ (event: 'isStatsReady'): void }>()
</script>

<template>
  <LazySummaryLegendTable @is-mounted="isDoughnutChart = true" />
  <LazySummaryDoughnutChart v-if="isDoughnutChart" @is-mounted="isStatsTable = true" />
  <LazySummaryLiveInfoTable v-if="isStatsTable" @is-mounted="emit('isStatsReady')" />
  <!-- <LazySummaryCharts /> -->
</template>
