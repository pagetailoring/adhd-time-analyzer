<script lang="ts" setup>
const { today } = storeToRefs(useClockStore())
const { dayToDisplayDate } = storeToRefs(useAnalyzerViewStore())

// Amout days to display in select
const totalDays = DAYS_TO_SELECT_LIMIT

const items = computed(() => {
  const result = []
  for (let i = 0; i <= totalDays; i++) {
    const shiftedDate = getShiftedDateString(today.value, -i)
    let label: string
    if (i === 0) {
      label = 'Today'
    } else if (i === 1) {
      label = 'Yesterday'
    } else if (i === 6) {
      label = 'Week Ago'
    } else if (i <= 5) {
      label = useDateFormat(shiftedDate, 'dddd').value
    } else {
      label = useDateFormat(shiftedDate, 'MMMM Do').value
    }
    result.push({ label, value: shiftedDate })
  }
  return result
})
</script>

<template>
  <UiSelect v-model="dayToDisplayDate" :items />
</template>
