/**
 * Collects sequential log entries while gaps between them are within threshold.
 *
 * @param entries - array of TimeLog sorted chronologically
 * @param thresholdMs - maximum allowed gap between consecutive entries in ms
 * @returns TimeLog[] - array of sequential entries up to the first gap exceeding threshold
 */

export function collectSequentialEntries(entries: TimeLog[], thresholdMs: number): TimeLog[] {
  if (!entries.length) return []
  const eligible: TimeLog[] = [entries[0]]
  for (let i = 1; i < entries.length; i++) {
    const prevTime = getLogDate(entries[i - 1]).getTime()
    const currTime = getLogDate(entries[i]).getTime()
    if (currTime - prevTime <= thresholdMs) {
      eligible.push(entries[i])
    } else {
      break
    }
  }
  return eligible
}

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
