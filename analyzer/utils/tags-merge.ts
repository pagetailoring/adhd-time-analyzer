/**
 * Merge multiple arrays of generic items into a single array, removing duplicates.
 * Uses Set for efficient deduplication. Maintains insertion order.
 *
 * @typeParam T - type of items, must be comparable (e.g., string or number)
 * @param arrays - any number of arrays containing items of type T
 * @returns a flat array of unique items of type T
 */
export function mergeManyTags<T>(...arrays: T[][]): T[] {
  const allItems = arrays.flat()
  return Array.from(new Set(allItems))
}

/**
 * Conditionally merge a base set of tags with a track set of tags.
 * The base parameter can be either a single array or an array of arrays.
 * If any base item matches one of the trackKeys, the track array is included in the merge;
 * otherwise only the base items are returned.
 * Duplicate removal is delegated to mergeManyTags.
 *
 * @param base - a single array or nested arrays of items of type T
 * @param track - the array to include only if a condition is met
 * @param trackKeys - optional list of items to check for presence in base;
 *                   defaults to the labels under the 'info' color category
 * @returns an array of merged items of type T, with duplicates removed
 */
export function mergeTags<T extends string>(base: T[] | T[][], track: T[], trackKeys?: T[]): T[] {
  // Determine default keys from COLOR_TO_LABELS['info'] if not provided
  const defaultKeys = (COLOR_TO_LABELS['info'] ?? []) as T[]
  const keysToCheck = trackKeys ?? defaultKeys

  // Normalize base to a flat array
  const baseArray: T[] = Array.isArray(base[0]) ? (base as T[][]).flat() : (base as T[])

  // Determine if any base item matches one of the specified keys
  const needsTrack = baseArray.some((item) => keysToCheck.indexOf(item) !== -1)

  // Merge base (and track if needed), then deduplicate
  return needsTrack ? mergeManyTags(baseArray, track) : mergeManyTags(baseArray)
}

// export function mergeTags(
//   base: TimeLogType[] | TimeLogType[][],
//   track: TimeLogType[],
//   trackKeys: string[] = ['coding', 'work', 'work others']
// ): TimeLogType[] {
//   // Normalize base to a flat array
//   const baseArray: TimeLogType[] = Array.isArray(base[0])
//     ? (base as TimeLogType[][]).flat()
//     : (base as TimeLogType[])

//   // Determine if any base item has one of the specified keys with a defined value
//   const needsTrack = baseArray.some((item) =>
//     trackKeys.some(
//       (key) =>
//         // cast to any for dynamic property access
//         (item as any)[key] !== undefined
//     )
//   )

//   // Merge base (and track if needed), then deduplicate
//   return needsTrack ? mergeManyTags(baseArray, track) : mergeManyTags(baseArray)
// }
