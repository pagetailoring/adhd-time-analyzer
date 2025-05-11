// --- 1. Define mapping from group values to NuxtUiColor
const groupColorMap: Record<string, NuxtUiColor> = {
  one: 'info', // both "one" and "two" map to "info"
  two: 'info',
  life: 'success', // activities in "life" group get a green success color
  warn: 'warning', // "warn" group becomes a yellow warning color
  other: 'neutral', // any "other" group is rendered as neutral
}

// --- 2. Fallback arrays (your original lists)
const info = ['test', 'work']
const success = ['eat', 'self care', 'growth']

const infoFallback = info.concat(toTrackWork, toTrackProjects)
// const successFallback = success.concat(homeStuff).map((s) => s.toLowerCase())
const successFallback = success
const warningFallback = ['rabbit hole']
const errorFallback = ['get stuck']

// --- 3. Build a single map of key → color at module initialization
const keyColorMap: Map<string, NuxtUiColor> = new Map()

// 3a) Populate from mainActivityConfig
for (const tag of mainActivityConfig) {
  const keyLower = tag.key
  const color = groupColorMap[tag.group] ?? 'neutral'
  keyColorMap.set(keyLower, color)
}

// 3b) Populate fallbacks only if the key wasn’t already defined
for (const key of successFallback) {
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'success')
}
for (const key of infoFallback) {
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'info')
}
for (const key of warningFallback) {
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'warning')
}
for (const key of errorFallback) {
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'error')
}

// --- 4. Simplified lookup function
export function getActColor(key: string): NuxtUiColor {
  const normalized = key?.toLowerCase().trim() || ''
  // Return mapped color or neutral if unknown
  return keyColorMap.get(normalized) ?? 'neutral'
}

// console.log('mainActivityTags')
// console.log(mainActivityTags)
// success / info / warning / error / neutral

/**
 * @see /types/nuxtUi -> NuxtUiColor
 *
 * ⭐️ type AppConfigUI.colors?: {
 *      'primary'?: Color
 *      'secondary'?: Color
 *      'success'?: Color
 *      'info'?: Color
 *      'warning'?: Color
 *      'error'?: Color
 *      neutral?: NeutralColor
 *    }
 *    ....
 *  } & DeepPartial<typeof ui>
 *
 *
 * @see /.nuxt/types/ui.d.ts
 */
