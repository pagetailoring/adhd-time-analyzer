<script lang="ts" setup>
const isStatsTable = ref(false)
const isCharts = ref(false)
const isDoughnutChart = ref(false)
const emit = defineEmits<{ (event: 'isStatsReady'): void }>()
</script>

<template>
  <div
    class="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-9"
  >
    <ThemeCard class="bg-default z-3 flex-col items-center justify-center sm:col-span-2">
      <Suspense>
        <template #default>
          <LazySummaryLegendTable @is-mounted="isDoughnutChart = true" />
        </template>
        <template #fallback>
          <UiSkeleton class="h-full w-full" />
        </template>
      </Suspense>
    </ThemeCard>

    <div class="flex h-full content-center items-center justify-center sm:col-span-2 md:col-span-3">
      <Suspense>
        <template #default>
          <LazySummaryDoughnutChart v-if="isDoughnutChart" @is-mounted="isStatsTable = true" />
          <UiSkeleton v-else class="size-70 rounded-full" />
        </template>
        <template #fallback>
          <UiSkeleton class="size-70 rounded-full" />
        </template>
      </Suspense>
    </div>

    <ThemeCard class="bg-default justify-center sm:col-span-2">
      <Suspense>
        <template #default>
          <LazySummaryLiveInfoTable v-if="isStatsTable" @is-mounted="isCharts = true" />
          <UiSkeleton v-else class="h-full w-full" />
        </template>
        <template #fallback>
          <UiSkeleton class="h-full w-full" />
        </template>
      </Suspense>
    </ThemeCard>

    <ThemeCard class="flex-col justify-center sm:col-span-2 md:col-span-1 xl:col-span-2">
      <LazySummaryCharts v-if="isCharts" @is-mounted="emit('isStatsReady')" />
      <UiSkeleton v-else class="h-full w-full" />
    </ThemeCard>
  </div>
</template>
