// import { COLOR_TO_GROUP, TAGS_FALLBACK_COLOR, error, info, success, warning } from './config'

/**
 * @constant COLOR_TO_LABELS
 * @description Maps color categories directly to their corresponding tag keys,
 *              based on COLOR_TO_GROUP and MAIN_ACTIVITY_CONFIG.
 */
export const COLOR_TO_LABELS: Record<ColorKey, TimeLogTag[]> = (() => {
  const colors = Object.keys(COLOR_TO_GROUP) as UiColors[]
  const labelMap = Object.fromEntries(colors.map((c) => [c, [] as TimeLogTag[]])) as Record<
    UiColors,
    TimeLogTag[]
  >
  for (const { key, group } of MAIN_ACTIVITY_CONFIG) {
    const color = colors.find((c) => COLOR_TO_GROUP[c].includes(group)) ?? TAGS_FALLBACK_COLOR
    labelMap[color].push(key)
  }
  return labelMap
})()

export const colorsToTagsGroupsMap: Partial<Record<UiColors, TimeLogTag[]>> = {
  info: [...info, ...(COLOR_TO_LABELS.info || [])],
  success: [...success, ...(COLOR_TO_LABELS.success || [])],
  warning: [...warning, ...(COLOR_TO_LABELS.warning || [])],
  error: [...error, ...(COLOR_TO_LABELS.error || [])],
  neutral: [...(COLOR_TO_LABELS.neutral || [])],
}

/**
 * @constant MAIN_TAGS_COLOR_MAP
 * @description Inverse mapping from individual tag keys to their color category.
 */
export const MAIN_TAGS_COLOR_MAP: Partial<Record<UiColors, TimeLogTag>> = (() => {
  const groupLabel: Partial<Record<UiColors, TimeLogTag>> = {}
  for (const [color, labels] of Object.entries(COLOR_TO_LABELS)) {
    for (const label of labels) {
      groupLabel[label as UiColors] = color
    }
  }
  return groupLabel
})()
