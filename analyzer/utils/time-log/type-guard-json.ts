/**
 * Checks whether a given value is a Record<string, TimeLog[]>.
 */
export function isTimeLogRecord(o: unknown): o is Record<string, TimeLog[]> {
  // 1. It must be an object (not null and of type "object")
  if (o === null || typeof o !== 'object') return false

  // 2. Iterate over all values in the object
  return Object.values(o).every(
    (arr) =>
      // 2a. Each value must be an array
      Array.isArray(arr) &&
      // 2b. Every element in the array must satisfy the isTimeLogValid guard
      arr.every(isTimeLogValid)
  )
}
