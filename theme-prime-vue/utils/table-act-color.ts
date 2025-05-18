// --- 1. Define mapping from group values to NuxtUiColor
const groupColorMap: Record<string, PrimeUiColor> = {
  one: 'info', // both "one" and "two" map to "info"
  two: 'info',
  life: 'success', // activities in "life" group get a green success color
  warn: 'warn', // "warn" group becomes a yellow warning color
  other: 'secondary', // any "other" group is rendered as neutral
}

// --- 2. Fallback arrays (your original lists)
const info = ['test', 'work']
const success = ['eat', 'self care', 'growth']

const infoFallback = info.concat(toTrackWork, toTrackProjects)
const successFallback = success
const warningFallback = ['rabbit hole']
const errorFallback = ['get stuck']

// --- 3. Build a single map of key → color at module initialization
const keyColorMap: Map<string, PrimeUiColor> = new Map()

// 3a) Populate from mainActivityConfig
for (const tag of mainActivityConfig) {
  const keyLower = tag.key
  const color = groupColorMap[tag.group] ?? 'secondary'
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
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'warn')
}
for (const key of errorFallback) {
  if (!keyColorMap.has(key)) keyColorMap.set(key, 'danger')
}

// @todo repetitnion in two layer but difrent colors

// --- 4. Simplified lookup function
export function getActColor(key: string): PrimeUiColor {
  const normalized = key?.toLowerCase().trim() || ''
  // Return mapped color or neutral if unknown
  return keyColorMap.get(normalized) ?? 'secondary'
}
