/**
 * Converts a TimeLog entry into a JavaScript Date object.
 *
 * Combines the `date` and `ts` (timestamp) fields from the given TimeLog
 * into a full ISO 8601 datetime string and returns a corresponding Date instance.
 *
 * @param log - The time log object containing `date` (YYYY-MM-DD) and `ts` (HH:mm:ss) properties.
 * @returns A Date object representing the exact moment defined by the log's date and timestamp.
 */

export function getLogDate(log: TimeLog): Date {
  return new Date(`${log.date}T${log.ts}`)
}
