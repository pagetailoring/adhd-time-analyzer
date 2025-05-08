/**
 * Composable to merge `track` and `time` arrays into `type`,
 * base on specific (default: hard cooded) conditions.
 *
 * @param type -> base <T>
 * @param timeTags -> track: potentially merge with `base`.
 * @param trackTags -> time: merge with the result.
 *
 * @returns An object containing the `merge` function that updates the `type` with merged time log data.
 */

export function useTagsMerge() {
  const merge = (
    type: Ref<TimeLogType[]>,
    timeTags: Ref<TimeLogType[]>,
    trackTags: Ref<TimeLogType[]>
  ) => {
    // Update the type value of Ref with the result of merging the provided arrays
    type.value = mergeTags(type.value, trackTags.value, timeTags.value)
  }

  return { merge }
}

function mergeTags(
  base: TimeLogType[],
  track: TimeLogType[],
  time: TimeLogType[],
  // Defaut key.
  trackKeys: string[] = ['coding', 'work', 'work others']
): TimeLogType[] {
  const needsTrack = base.some((t) => trackKeys.includes(t))
  const temp = needsTrack ? base.concat(track, time) : base.concat(time)
  // Remove duplicates before @returns
  return Array.from(new Set(temp))
}
