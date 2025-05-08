<template>
  <UApp>
    <main id="App" class="flex flex-col gap-4">
      <header class="min-h-10">
        <AppTheHeader />
      </header>

      <section class="min-h-35">
        <LazyAppNewLogsAdding />
      </section>
      <section class="min-h-75">
        <LazyAppSummaryContainer />
      </section>
      <section class="min-h-150">
        <LazyAppTheLogsListTable />
      </section>
    </main>
  </UApp>
</template>
