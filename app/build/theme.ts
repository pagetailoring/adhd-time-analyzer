import { resolve } from 'node:path'
import fs from 'fs-extra'
import { themeMap } from '../config.layers'
import { toSnakeCase } from '../utils/snake-case'
import { getThemeKey } from './theme-key'

/**
 * Generate alias for the currently active theme layer.
 * Resolves paths relative to the project root directory.
 */
export function getActiveThemeLayerAlias(): Record<string, string> {
  const themeKey = getThemeKey()
  const selectedPaths = themeMap[themeKey] || themeMap.noop

  if (!selectedPaths.length) return {}
  const aliasName = `${toSnakeCase(themeKey)}_LAYER`
  const resolvedPath = resolve(process.cwd(), selectedPaths[0])

  if (!fs.existsSync(resolvedPath)) {
    console.warn('⚠️ Theme layer path not found:', resolvedPath)
  }

  return { [aliasName]: resolvedPath }
}
