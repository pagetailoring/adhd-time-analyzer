// Grouped array of keys for USelect (string[][])
export const mainActivityTags: string[][] = (() => {
  const sorted = mainActivityConfig.slice().sort((a, b) => a.orderInSelect - b.orderInSelect)
  const groups: Record<string, string[]> = {}
  for (const item of sorted) {
    if (!groups[item.groupInSelect]) groups[item.groupInSelect] = []
    groups[item.groupInSelect].push(item.key)
  }
  return Object.values(groups)
})()

// Flat array of keys (string[]) for scenarios requiring a single-level list
export const mainActivityTagsFlat: string[] = mainActivityTags.flat()

// Array of colors matching the order of mainActivityTagsFlat
export const mainActivityColors: string[] = (() => {
  const sorted = mainActivityConfig.slice().sort((a, b) => a.orderInSelect - b.orderInSelect)
  const groups: Record<string, string[]> = {}
  for (const item of sorted) {
    if (!groups[item.groupInSelect]) groups[item.groupInSelect] = []
    groups[item.groupInSelect].push(item.color)
  }
  return Object.values(groups).flat()
})()

// Helper function returning default tags and duration for a given key
export const getMainActivityDefaults = (key: string): MainActivityDefaults => {
  const found = mainActivityConfig.find((item) => item.key === key)
  return found
    ? { tags: [...found.defaults.tags], duration: found.defaults.duration }
    : { tags: [], duration: 0 }
}
