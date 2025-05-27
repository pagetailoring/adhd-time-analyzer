<script lang="ts" setup>
const time = useDateFormat(useNow(), 'HH:mm')
const day = useDateFormat(useNow(), 'dddd')
</script>

<template>
  <UBadge variant="soft" :label="time" class="justify-center" />
  <UBadge
    color="neutral"
    variant="soft"
    :label="day"
    class="justify-center rounded-xl text-center opacity-70"
  />
</template>
