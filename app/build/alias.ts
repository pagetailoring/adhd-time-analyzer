import { resolve } from 'node:path'
import { layerDirNamesForAliases } from '../config.layers'
import { toSnakeCase } from '../utils/snake-case'
import { getActiveThemeLayerAlias } from './theme'

/**
 * Generate alias entries for specific directories and the active theme layer.
 * This helps Nuxt/Vite resolve layer-relative paths during the build process.
 */

export function getAliasList(): Record<string, string> {
  const aliases: Record<string, string> = {}
  const cwd = resolve(process.cwd(), '..')

  for (const dir of layerDirNamesForAliases) {
    const name = toSnakeCase(dir)
    const aliasKey = `${name}_LAYER`
    aliases[aliasKey] = resolve(cwd, dir)
  }

  Object.assign(aliases, getActiveThemeLayerAlias())
  // console.log('✅', ' Aliases:\n', aliases)
  return aliases
}
