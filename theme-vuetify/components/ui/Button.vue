<script lang="ts" setup>
const { label = '' } = defineProps<{
  label?: string | undefined
}>()
</script>

<template>
  <v-btn>
    <slot></slot>
    {{ label }}
  </v-btn>
</template>
