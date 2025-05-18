import { useDateFormat } from '@vueuse/core'

/**
 * Converts a `Date` object to a string in `YYYY-MM-DD` format.
 * @param date - The `Date` object to format.
 * @returns A string representation of the date in `YYYY-MM-DD` format.
 */
const getDateString = (date: Date): string => useDateFormat(date, 'YYYY-MM-DD').value

/**
 * Converts a date string in `YYYY-MM-DD` format to a `Date` object.
 * @param date - The date string to parse.
 * @returns A new `Date` object based on the input string.
 */
const getDateFromString = (date: string): Date => new Date(date)

/**
 * Returns a formatted date string shifted by a number of days from the input date.
 * @param date - The base date string in `YYYY-MM-DD` format.
 * @param dayAgo - Number of days to shift. Negative values go into the past. Default is -1.
 * @returns A new date string in `YYYY-MM-DD` format after applying the day shift.
 */

export function getShiftedDateString(date: string, dayAgo = -1): string {
  const inputDate = getDateFromString(date)
  inputDate.setDate(inputDate.getDate() + dayAgo)
  return getDateString(inputDate)
}
