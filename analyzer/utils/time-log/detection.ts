/**
 * It analyzes time log data to detect the best index
 * where a significant gap exists between entries.
 * If the gap exceeds a specified threshold in hours,
 * it identifies the best index to override daily logs.
 *
 * @param {TimeLog[]} logs - The array of time logs to analyze.
 * @param {number} sleepThresholdHours - The gap threshold (in hours) to consider for detecting the day start (default is 3 hours).
 * @returns {boolean | undefined} - It returns the result as a log ID or undefined.
 */

export function useEffectiveNightGapAutoDetect() {
  function detectDayStart(
    logs: TimeLog[],
    sleepThresholdHours: number = AUTO_DETECT_SLEEP_THRESHOLD_HOURS
  ) {
    const dayStartLogIdx = findLongestGapIndex(logs, sleepThresholdHours)
    if (dayStartLogIdx === -1) return undefined

    const cutoffLogId = logs[dayStartLogIdx].id

    return cutoffLogId
  }

  return { detectDayStart }
}

/**
 * @future ⭐️
 *
 * @note This function is a simplified, quick numerical check
 * to validate the concept.
 *
 * @problem If the approach doesn't work as expected, consider implementing a more robust logic
 * that checks all gaps in the continuity and selects the best option, giving the user
 * the possibility to override when multiple options are found.
 *
 * @idea In such a case, leverage existing logic in the statistics store to handle
 * multiple possible gaps and improve user control.
 */

// it can be extract to utils
function findLongestGapIndex(logs: TimeLog[], thresholdHours: number): number {
  const thresholdMinutes = thresholdHours * 60
  let bestGap = 0
  let bestIndex = -1

  // getLogDate(log: TimeLog): Date -> from ~/utils
  for (let i = 1; i < logs.length; i++) {
    const prevEnd = getLogDate(logs[i - 1]).getTime() + (logs[i - 1].dur || 0) * 60000
    const currStart = getLogDate(logs[i]).getTime()
    const gap = (currStart - prevEnd) / 60000

    if (gap >= thresholdMinutes && gap > bestGap) {
      bestGap = gap
      bestIndex = i
    }
  }
  return bestIndex
}
