function getSliceAndSorted(array: MainActivityTag[]): MainActivityTag[] {
  return array.slice().sort((a, b) => a.order - b.order)
}

function getArrayOfArrays(array: MainActivityTag[], valKey: 'color' | 'key'): string[][] {
  const sorted = getSliceAndSorted(array)
  const groups: Record<string, string[]> = {}
  for (const item of sorted) {
    if (!groups[item.group]) groups[item.group] = []
    groups[item.group].push(item[valKey])
  }
  return Object.values(groups)
}

// Grouped array of keys for Select (string[][])
export const MAIN_ACTIVITY_TAGS: string[][] = (() => {
  return getArrayOfArrays(MAIN_ACTIVITY_CONFIG, 'key')
})()

// Flat array of keys (string[]) for scenarios requiring a single-level list
export const MAIN_ACTIVITY_TAGS_FLAT: string[] = MAIN_ACTIVITY_TAGS.flat()

// Array of colors matching the order of MAIN_ACTIVITY_TAGS_FLAT
export const MAIN_ACTIVITY_COLORS: string[] = (() => {
  return getArrayOfArrays(MAIN_ACTIVITY_CONFIG, 'color').flat()
})()

// Helper function returning default tags and duration for a given key
export const getMainActivityDefaults = (key: string): MainActivityDefaults => {
  const found = MAIN_ACTIVITY_CONFIG.find((item) => item.key === key)
  return found
    ? { tags: [...found.defaults.tags], duration: found.defaults.duration }
    : { tags: [], duration: 0 }
}
