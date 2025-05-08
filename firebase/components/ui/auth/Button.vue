<script lang="ts" setup>
const { type = 'button' } = defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
}>()
</script>

<template>
  <button
    style="
      padding: 0.5em;
      letter-spacing: 0.15em;
      margin-block: 0.8em;
      border: 1px solid #314258;
      border-radius: 0.5em;
    "
    :type="type"
  >
    <slot />
  </button>
</template>
