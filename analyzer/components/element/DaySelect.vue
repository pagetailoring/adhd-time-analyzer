<script lang="ts" setup>
const { today } = storeToRefs(useClockStore())
const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())

// Lazy loaded store
const { useAppLazyStateStore } = await import('ANALYZER_LAYER/stores/lazy/config')
const { daysAvailableToSelect } = storeToRefs(useAppLazyStateStore())

// Amout days to display in select
const totalDays = computed(() => {
  return daysAvailableToSelect && daysAvailableToSelect.value
    ? daysAvailableToSelect.value
    : DAYS_TO_SELECT_LIMIT
})
const items = computed(() => getDaysSelectValues(today.value, totalDays.value))

const { trigger } = useProcessingState()
watch(dayToDisplayDate, trigger)
</script>

<template>
  <UiSelect v-model="dayToDisplayDate" class="up w-36 text-xs" :items />
</template>
