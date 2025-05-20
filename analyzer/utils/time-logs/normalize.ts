/**
 * Remove database-specific fields from a TimeLog before storing locally.
 * Strips out the `userId` property so that only the log’s own payload remains.
 *
 * @param log - A TimeLog object as fetched from the database.
 * @returns A new TimeLog object with database metadata removed.
 */
export function normalizeLog(log: TimeLog): TimeLog {
  const { userId, ...rest } = log
  return rest as TimeLog
}

/**
 * Batch-strip database metadata from an array of TimeLog entries.
 * Internally reuses `normalizeLog()` to remove `userId` from each entry.
 *
 * @param logsArr - An array of TimeLog objects as fetched from the database.
 * @returns A new array of TimeLog objects with database metadata removed.
 */
export function normalizeLogs(logsArr: TimeLog[]): TimeLog[] {
  return logsArr.map(normalizeLog)
}
