import { readFile, writeFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import stripJsonComments from 'strip-json-comments'
import { config } from 'dotenv'

import { themeMap, memoryMap } from '../config.layers'
import { getThemeKey } from './theme-key'

// Determine __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url))

// Read .env path from CLI argument, default to '../.env.local'
const envArg = process.argv[2] ?? '../.env.local'
const envPath = resolve(__dirname, '..', envArg)

// Load environment variables
console.log(`🧪 Loading environment variables from ${envArg}`)
config({ path: envPath })

/**
 * Returns layers to exclude: all layers except those selected by the environment.
 */
function getExcludeLayers(): string[] {
  const useFirebase = process.env.USE_FIREBASE === 'true'
  const selectedMemory = memoryMap[useFirebase ? 'true' : 'false']
  const themeKey = getThemeKey()
  const selectedTheme = themeMap[themeKey] ?? themeMap.noop

  const allThemes = Object.values(themeMap).flat()
  const allMemory = Object.values(memoryMap).flat()

  const excludeThemes = allThemes.filter((layer) => !selectedTheme.includes(layer))
  const excludeMemory = allMemory.filter((layer) => !selectedMemory.includes(layer))

  return [...excludeThemes, ...excludeMemory]
}

interface TsconfigSettings {
  extends: string
  compilerOptions: Record<string, unknown>
  exclude?: string[]
}

async function main(): Promise<void> {
  const cwd = process.cwd()
  const settingsPath = resolve(cwd, 'tsconfig.settings.json')
  const outputPath = resolve(cwd, 'tsconfig.json')

  const raw = await readFile(settingsPath, 'utf-8')
  const settings: TsconfigSettings = JSON.parse(stripJsonComments(raw))

  const exclude = getExcludeLayers()

  const finalConfig = {
    ...settings,
    exclude,
  }

  await writeFile(outputPath, JSON.stringify(finalConfig, null, 2))
  console.log(`✅ Generated tsconfig.json with exclude:`, exclude)
}

main().catch((error) => {
  console.error('❌ Deployment script failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
