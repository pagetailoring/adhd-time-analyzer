<script setup lang="ts">
const isMainTable = ref(false)
const isMainTableLoaded = ref(false)
</script>

<template>
  <main id="App" class="grid">
    <header>
      <AppTheHeader />
    </header>

    <section>
      <Suspense>
        <template #default>
          <LazyAppNewLogsAdding v-if="isMainTableLoaded" />
          <UiSkeleton v-else height="8.8rem" />
        </template>
        <template #fallback>
          <UiSkeleton height="8.8rem" />
        </template>
      </Suspense>
    </section>

    <section class="summary grid">
      <AppSummaryContainer @is-stats-ready="isMainTable = true" />
    </section>
    <section>
      <LazyAppTheLogsListTable v-if="isMainTable" @is-mounted="isMainTableLoaded = true" />
    </section>
  </main>
</template>
