/**
 * Filters and sorts TimeLog entries by their `sort` field ascending.
 * @param logs - array of TimeLog items
 * @returns new sorted array of TimeLog
 */
export function sortTimeLogs(logs: TimeLog[]): TimeLog[] {
  return logs
    .filter((log) => !!log.sort)
    .slice() // shallow copy to avoid mutating original
    .sort((a, b) => Number(a.sort) - Number(b.sort))
}
