<script lang="ts" setup>
// Height of all elements in this
const height = 'h-10'

// @shortcut: should be IS_EXTERNAL_DB, but for now IS_DEMO_PAGE is sufficient
const pub = useRuntimeConfig().public
const isDemo = ref(pub.IS_DEMO_PAGE)
</script>

<template>
  <ThemeCard
    :is-grid="true"
    :class="{
      ['sm:' + height]: true,
      'bg-default': true,
      'z-10 -mx-1 pb-2 sm:grid-cols-3 sm:pb-0 md:grid-cols-5 md:grid-rows-none': true,
    }"
  >
    <UiButtonGroup
      :class="{
        [height]: true,
        'hidden w-fit overflow-hidden border sm:flex': true,
        'order-1 md:col-span-2': true,
      }"
    >
      <LazyDevRwdHelper v-if="!isDemo" />
      <LazyElementProcessingState :class="height" />
      <LazyElementGitHubLink class="justify-center" :class="height" />
      <LazyElementClockAndDay />
    </UiButtonGroup>

    <UButtonGroup
      :class="{
        [height]: true,
        'w-full justify-self-end sm:w-fit': true,
        'ml-auto overflow-hidden border': false,
        'sm:order-3 md:col-span-2': true,
      }"
    >
      <ElementDaySelectWrapper :class-to-add="'grow h-10 w-36 text-xs hidden sm:block'" />
      <ElementProcessingState class="sm:hidden" />
      <LazyElementGitHubLink class="justify-center sm:hidden" />
      <ElementDaySelectWrapper :class-to-add="'grow h-10 md:w-36 text-xs sm:hidden'" />
      <LazyElementToolsMenu />
      <LazyElementColorModeButton />
    </UButtonGroup>

    <h1 class="up border-0 py-2 text-center text-xs font-bold opacity-80 sm:order-2 sm:py-0">
      <span>Time Analizer</span>
    </h1>
  </ThemeCard>
</template>
