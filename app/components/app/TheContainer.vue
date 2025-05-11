<script setup lang="ts">
const isMainTable = ref(false)
const isMainTableLoaded = ref(false)
</script>

<template>
  <UApp>
    <main id="App" class="flex flex-col gap-4 w-full">
      <header class="min-h-10">
        <AppTheHeader />
      </header>

      <section class="min-h-35 gap-4 grid">
        <AppNewLogsAdding :should-trigger-load="isMainTableLoaded" />
      </section>

      <section>
        <AppSummaryContainer class="min-h-80" @is-stats-ready="isMainTable = true" />
      </section>

      <section class="min-h-80">
        <Suspense>
          <template #default>
            <LazyAppTheLogsListTable v-if="isMainTable" @is-mounted="isMainTableLoaded = true" />
            <ThemeSkeleton v-else class="h-full w-full min-h-120" />
          </template>
          <template #fallback>
            <ThemeSkeleton class="h-full w-full min-h-120" />
          </template>
        </Suspense>
      </section>
    </main>
  </UApp>
</template>
