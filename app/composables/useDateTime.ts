import { useDateFormat } from '@vueuse/core'

export function useDateTime() {
  const getDateString = (date: Date) => useDateFormat(date, 'YYYY-MM-DD').value
  const getDateFromString = (date: string) => new Date(date)

  function getShiftedDateString(date: string, dayAgo = -1): string {
    const inputDate = getDateFromString(date)
    inputDate.setDate(inputDate.getDate() + dayAgo)

    return getDateString(inputDate)
  }

  return { getShiftedDateString }
}
