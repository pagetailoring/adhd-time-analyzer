<script setup lang="ts">
defineProps<{
  label?: string
  name: string
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <div style="display: grid; gap: 0.2em; min-width: 14rem">
    <label
      :for="name"
      style="font-size: 0.6em; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em"
    >
      <span>{{ label ? label : name }}</span>
    </label>
    <input
      v-bind="$attrs"
      :id="name"
      v-model="modelValue"
      :name
      style="
        font-size: 1em;
        text-align: center;
        padding: 0.4em 0.6em;
        border: 1px solid #314258;
        border-radius: 0.5em;
      "
    />
  </div>
</template>
