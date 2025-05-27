<script setup lang="ts">
const { useAppLazyStateStore } = await import('ANALYZER_LAYER/stores/lazy/config')
const { isOpenSettings } = storeToRefs(useAppLazyStateStore())
whenever(isOpenSettings, () => openSettingDrawer())

const pub = useRuntimeConfig().public
const isDemo = pub.IS_DEMO_PAGE

const isDrawerLoaded = ref(false)
async function openSettingDrawer() {
  if (!isDemo) {
    isOpenSettings.value = true
    isDrawerLoaded.value = true
  }
}

const { isTodayDataDisplayed } = storeToRefs(useAnalyzerViewStore())
const isCacheActionsLoaded = ref(false)

onMounted(async () => {
  console.log(toolsIcon, 'Tools')
  isOpenSettings.value = false

  // watch once until isTodayDataDisplayed.value === false
  await until(isTodayDataDisplayed).toBe(false)
  isCacheActionsLoaded.value = true
})
</script>

<template>
  <template v-if="!isDemo">
    <LazyUiButton
      v-if="!isOpenSettings"
      size="md"
      icon="lucide:settings"
      class="lef-0 fixed bottom-0 z-10"
      @click="openSettingDrawer"
    />

    <LazyToolsSettingsDrawer v-if="isDrawerLoaded" />
  </template>

  <LazyToolsWaitUntilProcessesIdle v-if="isCacheActionsLoaded">
    <LazyToolsStoreInCacheTables />
  </LazyToolsWaitUntilProcessesIdle>
</template>
