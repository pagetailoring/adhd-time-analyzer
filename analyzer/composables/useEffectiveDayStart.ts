/**
 * Composable: computes the effective start of the day based on
 * sequential TimeLog entries. It walks from the first log onward
 * while gaps between log timestamps are <= gapThresholdMinutes,
 * sums their durations, and returns a Date representing the start
 * (last eligible log's timestamp minus total duration).
 *
 * @param logs - Ref<TimeLog[]> sorted chronologically (oldest first)
 * @param gapThresholdMinutes - maximum gap (in minutes) between entries (default is 1)
 * @returns ComputedRef<Date | null> - computed effective day start or null if no logs
 */

export function useEffectiveDayStart(
  logs: Ref<TimeLog[]>,
  gapThresholdMinutes = STATISTICS_EFFECTIVE_DAY_START_GAP_MINUTES
): ComputedRef<Date | null> {
  return computed(() => {
    const entries = logs.value
    if (!entries.length) return null

    const thresholdMs = gapThresholdMinutes * 60_000
    // Collect sequential entries within threshold gaps
    const eligible = collectSequentialEntries(entries, thresholdMs)

    // Sum their durations (in minutes)
    const totalMinutes = eligible.reduce((sum, log) => sum + log.dur, 0)

    // Compute start: last eligible log date minus total duration
    const lastTimestamp = getLogDate(eligible[eligible.length - 1]).getTime()
    return new Date(lastTimestamp - totalMinutes * 60_000)
  })
}

/**
 * Collects sequential log entries while gaps between them are within threshold.
 *
 * @param entries - array of TimeLog sorted chronologically
 * @param thresholdMs - maximum allowed gap between consecutive entries in ms
 * @returns TimeLog[] - array of sequential entries up to the first gap exceeding threshold
 */
function collectSequentialEntries(entries: TimeLog[], thresholdMs: number): TimeLog[] {
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
