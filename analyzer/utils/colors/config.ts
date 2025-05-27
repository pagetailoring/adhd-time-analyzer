/**
 * @constant COLOR_TO_GROUP
 * @description Maps visual color categories to main tags.
 */

export const COLOR_TO_GROUP: Record<string, string[]> = {
  success: ['life'],
  info: ['one', 'two'],
  warning: ['warn'],
  neutral: [],
} as const

export const TAGS_FALLBACK_COLOR = 'neutral' as UiColors

/**
 * @description Maps of rest tags.
 */
export const info = ['test', 'work', ...toTrackWork, ...toTrackProjects]
export const success = ['eat', 'self care', 'growth']
export const warning = ['rabbit hole', 'drift away', 'put out fires']
export const error = ['get stuck', 'digression']
