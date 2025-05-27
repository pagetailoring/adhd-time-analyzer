<script setup lang="ts">
const { useAppLazyStateStore } = await import('ANALYZER_LAYER/stores/lazy/config')
const { isOpenSettings } = storeToRefs(useAppLazyStateStore())

const isRadioLoaded = ref(false)

onMounted(() => console.log(toolsIcon, 'tools drawer'))
</script>

<!-- <LazyElementUploadButton v-if="!isDemo" /> -->
<template>
  <UDrawer
    v-model:open="isOpenSettings"
    title="App settings"
    description="App settings"
    :ui="{ title: 'hidden', description: 'hidden' }"
    should-scale-background
    set-background-color-on-scale
  >
    <template #body>
      <div class="mb-2 flex grid min-h-48 gap-4 sm:grid-cols-3">
        <div class="grid content-center justify-items-center border sm:col-span-2">
          <Suspense>
            <LazyToolsLastDaysInCache />
            <template #fallback><LazyUiLoadingIcon /></template>
          </Suspense>
        </div>
        <div class="content-center justify-items-center text-center">
          <Suspense v-if="isRadioLoaded">
            <LazyToolsDaySelectSettings />
            <template #fallback><LazyUiLoadingIcon /></template>
          </Suspense>
          <UiButton
            v-else
            name="i-lucide-refresh-cw"
            label="Load day select settings"
            class="up text-xs"
            @click="isRadioLoaded = true"
          />
        </div>
      </div>
    </template>
  </UDrawer>
</template>
