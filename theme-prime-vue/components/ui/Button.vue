<script lang="ts" setup>
const { type = 'button', label = '' } = defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
  label?: string | undefined
}>()
</script>

<template>
  <Button :type="type" :label="label" severity="info" variant="outlined" />
</template>
