import { useDateFormat } from '@vueuse/core'

/**
 * Generates an array of select options representing dates from today going back a specified number of days.
 *
 * Each entry includes a human-readable label (e.g., "Today", "Yesterday", "Monday", "May 20th") and
 * the corresponding shifted date string in ISO format (YYYY-MM-DD).
 *
 * @param todayDate - A string representing the current date in ISO format (YYYY-MM-DD).
 * @param totalDays - Total number of days to include going backwards from the given date.
 * @returns An array of objects each with a `label` and `value` property for use in select components.
 */
export function getDaysSelectValues(todayDate: string, totalDays: number): DaySelectOption[] {
  const result: DaySelectOption[] = []

  for (let i = 0; i <= totalDays; i++) {
    const shiftedDate = getShiftedDateString(todayDate, -i)
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
}
