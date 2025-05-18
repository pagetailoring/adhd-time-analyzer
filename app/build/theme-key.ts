import { themeMap } from '../config.layers'
import type { Theme } from '../types/theme'

const FALLBACK_THEME: Theme = 'noop'

/**
 * Returns the active theme key from the environment,
 * or a fallback value if not defined or invalid.
 */
export function getThemeKey(): Theme {
  const value = process.env.UI_THEME
  return value && value in themeMap ? (value as Theme) : FALLBACK_THEME
}
