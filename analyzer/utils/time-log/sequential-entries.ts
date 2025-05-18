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
