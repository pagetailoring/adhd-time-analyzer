<script lang="ts" setup>
const { type = 'button', label } = defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
  label?: string | undefined
}>()
</script>

<template>
  <UButton :type="type" :label="label" />
</template>
