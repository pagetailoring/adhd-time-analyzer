/**
 * Composable: computes the effective start of the day based on
 * sequential TimeLog entries. It walks from the first log onward
 * while gaps between log timestamps are <= gapThresholdMinutes,
 * sums their durations, and returns a Date representing the start
 * (last eligible log's timestamp minus total duration).
 *
 * @param entries - Logs TimeLog[] sorted chronologically (oldest first)
 * @param gapThresholdMinutes - maximum gap (in minutes) between entries (default is 1)
 * @returns ComputedRef<Date | null> - computed effective day start or null if no logs
 */

export function useEffectiveDayStart(
  entries: Ref<TimeLog[]>,
  gapThresholdMinutes = STATISTICS_EFFECTIVE_DAY_START_GAP_MINUTES
): ComputedRef<Date | null> {
  return computed(() => {
    if (!entries.value.length) return null

    const thresholdMs = gapThresholdMinutes * 60_000
    // Collect sequential entries within threshold gaps
    const eligible = collectSequentialEntries(entries.value, thresholdMs)

    // Sum their durations (in minutes)
    const totalMinutes = eligible.reduce((sum, log) => sum + log.dur, 0)

    // Compute start: last eligible log date minus total duration
    const lastTimestamp = getLogDate(eligible[eligible.length - 1]).getTime()
    return new Date(lastTimestamp - totalMinutes * 60_000)
  })
}
