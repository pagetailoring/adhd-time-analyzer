/**
 * @param logs        - The full array of TimeLog items.
 * @param cutoffPoint - time log
 * @param cutDown     - cut down or up
 * @returns           - A new array containing `startLog` and all subsequent entries.
 */

export function sliceTimeLogs(
  logs: TimeLog[],
  cutoffPointId: string | undefined,
  cutDown = true
): TimeLog[] {
  if (cutoffPointId === undefined) return logs

  const idx = getIndexById(logs, cutoffPointId)

  // @dev @todo to remove
  if (isDev) consoleCut(cutDown, idx)

  if (idx < 0) return logs
  else if (!cutDown) return logs.slice(0, idx)

  return idx >= 0 ? logs.slice(idx) : []
}

// @dev @todo to remove
function consoleCut(cutDown: boolean, idx: number) {
  console.log('✂️', cutDown ? 'cut down' : 'CUT UP', 'from', idx, '✂️')
}

/**
 * Finds the index of a TimeLog entry by its unique ID.
 * @param logs    - The full array of TimeLog items.
 * @param id      - The `id` identifier to search for.
 * @returns       - The index of the matching TimeLog entry, or -1 if not found.
 */
const getIndexById = (logs: TimeLog[], id: string | undefined): number =>
  logs.findIndex((log: TimeLog) => log.id === id)
