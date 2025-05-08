<script lang="ts" setup>
const { isSummaryReady } = storeToRefs(useAnalyzerSummaryStore())
</script>

<template>
  <div
    v-if="isSummaryReady"
    class="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-9"
  >
    <ThemeCard class="justify-center flex-col sm:col-span-2 md:col-span-1 xl:col-span-2">
      <LazySummaryLiveInfoChart />
    </ThemeCard>

    <ThemeCard class="justify-center sm:col-span-2">
      <LazySummaryLiveInfoTable />
    </ThemeCard>

    <ThemeCard class="justify-center sm:col-span-2 md:col-span-3" :is-border="false">
      <LazySummaryDoughnutChart />
    </ThemeCard>
    <ThemeCard class="justify-center items-center flex-col sm:col-span-2">
      <LazySummaryListTable />
    </ThemeCard>
  </div>
</template>
