<script lang="ts" setup>
// Height of all elements in this
const height = 'h-10'

const pub = useRuntimeConfig().public
const isDemo = ref(pub.IS_DEMO_PAGE)
</script>

<template>
  <ThemeCard
    :is-grid="true"
    :class="`md:grid-cols-5 md:grid-rows-none min-h-${height} sm:${height}`"
  >
    <div class="md:col-span-2">
      <Transition>
        <LazyElementClockAndDay :class="height">
          <LazyAuthLogoutButton v-if="!isDemo" class="col-span-3 justify-center" />
          <LazyElementGitHubLink class="justify-center" />
        </LazyElementClockAndDay>
      </Transition>
    </div>

    <h1
      :class="styleUp"
      class="text-center border-0 text-xs font-bold opacity-80 px-12 py-4 sm:px-2 sm:py-0"
    >
      <span>Time Analizer</span>
    </h1>

    <div class="md:col-span-2 flex">
      <UButtonGroup class="ml-auto mr-0">
        <ElementDaySelect />
        <LazyElementDownloadButton />
        <LazyDevConsoleButton v-if="!isDemo" />
        <LazyElementColorModeButton />
        <LazyDevRwdHelper v-if="!isDemo" />
      </UButtonGroup>
    </div>
  </ThemeCard>
</template>
