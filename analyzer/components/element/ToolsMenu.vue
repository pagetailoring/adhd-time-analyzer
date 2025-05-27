<script setup lang="ts">
const isMenuOpen = ref(false)

const { useAppLazyStateStore } = await import('ANALYZER_LAYER/stores/lazy/config')
const { isOpenSettings } = storeToRefs(useAppLazyStateStore())

async function openSettings() {
  isMenuOpen.value = false

  await nextTick()
  isOpenSettings.value = true
}

// @shortcut: should be IS_EXTERNAL_DB, but for now IS_DEMO_PAGE is sufficient
const pub = useRuntimeConfig().public
const isDemo = pub.IS_DEMO_PAGE
const isDB = IS_EXTERNAL_DB
</script>

<template>
  <div>
    <UPopover v-model:open="isMenuOpen">
      <UiButton
        icon="i-lucide-ellipsis-vertical"
        aria-label="Open tools menu"
        class="w-10"
        color="neutral"
        variant="subtle"
      />

      <template #content>
        <div class="grid w-48 p-1 uppercase">
          <LazyElementDownloadButton label="download data" class="text-xs uppercase" />
          <UiButton
            v-if="!isDemo"
            variant="ghost"
            label="settings"
            class="up text-xs"
            icon="lucide:settings"
            @click="openSettings"
          />
          <LazyDevConsoleButton v-if="!isDemo" label="console log" class="text-xs uppercase" />
          <LazyAuthLogoutButton
            v-if="isDB"
            variant="ghost"
            class="text-xs uppercase"
            icon="material-symbols:account-circle-off-outline-rounded"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>
