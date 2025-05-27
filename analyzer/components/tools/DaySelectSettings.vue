<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const { useAppLazyStateStore } = await import('ANALYZER_LAYER/stores/lazy/config')
const { daysAvailableToSelect } = storeToRefs(useAppLazyStateStore())

const items = ref<RadioGroupItem[]>([
  {
    label: `Default: ${DAYS_TO_SELECT_LIMIT}`,
    value: DAYS_TO_SELECT_LIMIT,
  },
  { label: `Double: ${DAYS_TO_SELECT_LIMIT * 2}`, value: DAYS_TO_SELECT_LIMIT * 2 },
  { label: 'One month: 30', value: 30 },
])

onMounted(() => console.log('Select settings is mounted'))
</script>

<template>
  <UiRadioGroup
    v-model="daysAvailableToSelect"
    legend="Days in select"
    variant="table"
    indicator="start"
    color="info"
    :items="items"
    :ui="{ legend: 'up text-center text-balance' }"
  />
</template>
