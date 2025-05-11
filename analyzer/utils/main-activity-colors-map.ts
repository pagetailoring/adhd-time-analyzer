/**
 * This module provides precomputed mappings for assigning activity tags to visual color groups.
 * It is based on a static configuration and used to consistently group and color activity data
 * (e.g. in charts or timelines).
 *
 * These mappings are designed for fast runtime access and shared usage across components,
 * ensuring consistent color assignments and optimized performance.
 */

/**
 * @constant COLOR_TO_GROUP
 * @description Maps visual color categories to logical group names (like "life" or "warn").
 */
export const COLOR_TO_GROUP: Record<string, string[]> = {
  success: ['life'],
  info: ['one', 'two'],
  warning: ['warn'],
  inverted: [],
}

/**
 * @constant GROUP_TO_LABELS
 * @description Maps group names to arrays of tag keys defined in `mainActivityConfig`.
 */
export const GROUP_TO_LABELS: Record<string, string[]> = (() => {
  const label: Record<string, string[]> = {}
  for (const { key, group } of mainActivityConfig) {
    if (!label[group]) label[group] = []
    label[group].push(key)
  }
  return label
})()

/**
 * @constant COLOR_TO_LABELS
 * @description Maps color categories directly to their corresponding tag keys.
 */
export const COLOR_TO_LABELS: Record<string, string[]> = (() => {
  const assignedGroups = new Set<string>()
  const label: Record<string, string[]> = {}
  for (const [color, groups] of Object.entries(COLOR_TO_GROUP)) {
    if (groups.length === 0) {
      label[color] = []
      continue
    }
    label[color] = groups.flatMap((group) => {
      assignedGroups.add(group)
      return GROUP_TO_LABELS[group] || []
    })
  }
  const wildcardColor = Object.entries(COLOR_TO_GROUP).find(
    ([, groups]) => groups.length === 0
  )?.[0]
  if (wildcardColor) {
    label[wildcardColor] = Object.entries(GROUP_TO_LABELS)
      .filter(([group]) => !assignedGroups.has(group))
      .flatMap(([, keys]) => keys)
  }
  return label
})()

/**
 * @constant LABEL_TO_GROUP
 * @description Inverse mapping from individual tag keys to their color category.
 */
export const LABEL_TO_GROUP: Record<string, string> = (() => {
  const groupLabel: Record<string, string> = {}
  for (const [color, labels] of Object.entries(COLOR_TO_LABELS)) {
    for (const label of labels) {
      groupLabel[label] = color
    }
  }
  return groupLabel
})()
