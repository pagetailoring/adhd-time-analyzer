<script lang="ts" setup>
const isDaySelect = ref<boolean>(true)
</script>

<template>
  <v-app-bar density="default" class="pr-2 pl-2" scroll-behavior="elevate">
    <h1 class="up">Analyzer App</h1>
    <v-spacer></v-spacer>

    <div style="width: 10rem; height: 2.5rem; max-width: 70vw" class="mx-2">
      <LazyElementDaySelect
        v-if="isDaySelect"
        item-value="value"
        item-title="label"
        :outlined="true"
        elevation="1"
        density="compact"
        max-width="70vw"
        variant="outlined"
      />
      <UiSkeleton v-else height="2.5rem" width="10rem" />
    </div>

    <LazyElementColorModeButton size="large" class="mx-2" />

    <ElementMenu class="mx-2" />
  </v-app-bar>
</template>
