/**
 * Remove database-specific fields from a TimeLog before storing locally.
 *
 * Strips out the `userId` property so that only the log’s own payload remains.
 *
 * @param log - A TimeLog object as fetched from the database.
 * @returns A new TimeLog object with database metadata removed.
 *
 * @example
 * ```ts
 * const dbLog: TimeLog = {
 *   id: '123',
 *   date: '2025-05-01',
 *   ts: '14:30:00',
 *   userId: 'user_abc',
 *   duration: 3600,
 * };
 *
 * const localLog = normalizeLog(dbLog);
 * // => { id: '123', date: '2025-05-01', ts: '14:30:00', duration: 3600 }
 * ```
 */
export function normalizeLog(log: TimeLog): TimeLog {
  const { userId, ...rest } = log
  return rest as TimeLog
}

/**
 * Batch-strip database metadata from an array of TimeLog entries.
 *
 * Internally reuses `normalizeLog()` to remove `userId` from each entry.
 *
 * @param logsArr - An array of TimeLog objects as fetched from the database.
 * @returns A new array of TimeLog objects with database metadata removed.
 *
 * @example
 * ```ts
 * const dbLogs: TimeLog[] = [
 *   { id: '1', date: '2025-05-01', ts: '10:00:00', userId: 'u1', duration: 1800 },
 *   { id: '2', date: '2025-05-01', ts: '11:00:00', userId: 'u1', duration: 2400 },
 * ];
 *
 * const localLogs = normalizeLogs(dbLogs);
 * // => [
 * //   { id: '1', date: '2025-05-01', ts: '10:00:00', duration: 1800 },
 * //   { id: '2', date: '2025-05-01', ts: '11:00:00', duration: 2400 },
 * // ]
 * ```
 */
export function normalizeLogs(logsArr: TimeLog[]): TimeLog[] {
  return logsArr.map(normalizeLog)
}
