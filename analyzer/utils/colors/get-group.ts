/**
 * @function getGroupsWithZeroSum
 * @description Creates a record of numeric sums keyed by color groups defined in COLOR_TO_GROUP.
 * @param colorToGroup - A record mapping color names to associated group identifiers.
 * @returns A Vue Ref object containing a record with numeric values initialized to 0 for each color key.
 */
export function getGroupsWithZeroSum(
  colorToGroup: GroupMap = COLOR_TO_GROUP as GroupMap
): Record<ColorKey, number> {
  const initialSums = {} as Record<ColorKey, number>

  for (const color of Object.keys(colorToGroup) as ColorKey[]) {
    initialSums[color] = 0
  }
  return initialSums
}
