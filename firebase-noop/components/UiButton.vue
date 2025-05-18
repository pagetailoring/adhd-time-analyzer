<script lang="ts" setup>
const { type = 'button', label = 'label' } = defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
  label?: string | undefined
}>()
</script>

<template>
  <button :type="type">
    <slot />
    <span> {{ label }} </span>
  </button>
</template>
