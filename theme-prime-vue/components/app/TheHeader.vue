<script lang="ts" setup>
const pub = useRuntimeConfig().public
const isDemo = ref(pub.IS_DEMO_PAGE)
</script>

<template>
  <Toolbar>
    <template #start>
      <h1>
        <span>Time Analizer</span>
      </h1>
    </template>

    <template #end>
      <LazyAuthLogoutButton v-if="!isDemo" />
      <LazyElementsColorModeButton />
    </template>
  </Toolbar>
</template>
