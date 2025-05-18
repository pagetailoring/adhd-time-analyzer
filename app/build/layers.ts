import { memoryMap, themeMap } from '../config.layers'
import { getThemeKey } from './theme-key'

/**
 * Return an array of Nuxt layer paths based on current environment variables.
 */
export function getLayerExtends(): string[] {
  const useFirebase = process.env.USE_FIREBASE === 'true'
  const selectedMemory = memoryMap[String(useFirebase) as 'true' | 'false']
  const themeKey = getThemeKey()
  const selectedTheme = themeMap[themeKey] || themeMap.noop
  const extendsLayers = [...selectedTheme, ...selectedMemory]
  // console.log('\n✅', ' Layers extends:', extendsLayers)
  return extendsLayers
}
