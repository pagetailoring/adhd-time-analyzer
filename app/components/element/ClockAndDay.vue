<script lang="ts" setup>
const time = useDateFormat(useNow(), 'HH:mm')
const day = useDateFormat(useNow(), 'dddd')
</script>

<template>
  <UButtonGroup size="xl">
    <slot></slot>
    <UBadge variant="soft" :label="time" class="col-span-2 justify-center" />
    <UBadge
      color="neutral"
      variant="soft"
      :label="day"
      class="col-span-3 w-full text-center opacity-70 justify-center rounded-xl"
    />
  </UButtonGroup>
</template>
