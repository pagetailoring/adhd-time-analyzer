const TAGS_COLOR_MAP: Record<string, UiColors> = (() => {
  const keyMap: Record<string, UiColors> = {}
  for (const [color, keys] of Object.entries(colorsToTagsGroupsMap) as [UiColors, string[]][]) {
    for (const rawKey of keys) {
      const k = normalizeString(rawKey)
      if (!(k in keyMap)) {
        keyMap[k] = color
      }
    }
  }
  return keyMap
})()

export function getActTagColor(key: string): UiColors {
  return TAGS_COLOR_MAP[normalizeString(key)] || TAGS_FALLBACK_COLOR
}
