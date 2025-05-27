<script setup lang="ts">
const isMainTable = ref(false)
const isMainTableLoaded = ref(false)
const isToolsSection = ref(false)
</script>

<template>
  <UApp id="App">
    <main class="bg-default mb-10 flex w-full flex-col gap-4 p-3" data-vaul-drawer-wrapper>
      <header class="sticky top-0 z-10 min-h-10">
        <AppTheHeader />
      </header>

      <section class="grid min-h-35 gap-4">
        <AppNewLogsAdding
          :should-trigger-load="isMainTableLoaded"
          @is-ready="isToolsSection = true"
        />
      </section>

      <section>
        <AppSummaryContainer class="min-h-80" @is-stats-ready="isMainTable = true" />
      </section>

      <section class="min-h-80">
        <Suspense>
          <template #default>
            <LazyAppTheLogsListTable v-if="isMainTable" @is-mounted="isMainTableLoaded = true" />
            <UiSkeleton v-else class="h-full min-h-120 w-full" />
          </template>
          <template #fallback>
            <UiSkeleton class="h-full min-h-120 w-full" />
          </template>
        </Suspense>
      </section>

      <LazyToolsWaitUntilProcessesIdle>
        <LazyAppToolsAndSettings />
      </LazyToolsWaitUntilProcessesIdle>
    </main>
  </UApp>
</template>
