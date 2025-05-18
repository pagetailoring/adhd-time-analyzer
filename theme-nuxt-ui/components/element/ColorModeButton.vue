<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

function cleanBodyStyles() {
  // ⭐️ because in nuxt.config.ts backgroud is set as bodyAttr for dark mode
  const el = document.querySelector('body')
  if (el) el.style.background = ''
}

onMounted(() => cleanBodyStyles())
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UiButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
