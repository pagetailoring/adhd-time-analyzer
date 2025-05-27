import { getAliasList } from './build/alias'
import { logBuildInfoWithComment } from './build/console'
import { getLayerExtends } from './build/layers'
import { getLicensePlugin, moveLicenseFile } from './build/license-handler'
import { getThemeKey } from './build/theme-key'

/**
 * Configuration mappings imported from './config.layers.ts':
 *
 * Mappings form the core of the app's modular layer system,
 * allowing easy switching of UI themes, memory backends, and style inclusions,
 * controlled by environment variables and build-time logic.
 */
import { stylesMap } from './config.layers'

const themeKey = getThemeKey()
const isDevelopment = process.env.NODE_ENV === 'development'
// Console logs to verify build config state
logBuildInfoWithComment(themeKey)

/**
 * Returns Nuxt module list depending on environment.
 */
function getModules() {
  const base = ['@nuxtjs/html-validator', '@nuxt/eslint', '@vueuse/nuxt']
  const testing = ['@nuxt/test-utils/module']
  const pinia = ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt']
  const prodOnly = ['nuxt-payload-analyzer']
  const modules = [...pinia, ...base, ...testing]
  return isDevelopment ? modules : [...modules, ...prodOnly]
}

/**
 * Nuxt configuration
 * See: https://nuxt.com/docs/api/configuration/nuxt-config
 */
export default defineNuxtConfig({
  /**
   * Dynamically extends base layers:
   * - UI layer (theme)
   * - Memory layer (Firebase or Noop)
   * Layers are determined via `getLayerExtends()` from `build/layers.ts`
   */
  extends: getLayerExtends(),

  /**
   * Dynamically includes modules depending on development mode
   */
  modules: getModules(),

  ssr: false,

  imports: {
    dirs: ['composables/app', 'types', 'utils', 'utils/config'],
  },

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en', style: 'color-scheme: dark;' },
      title: 'ADHD App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: 'Time analyzer' },
      ],
    },
  },

  /**
   * Load appropriate theme and dev styles using `stylesMap` from `config.layers.ts`
   */
  css: isDevelopment
    ? [...(stylesMap[themeKey] ?? []), ...stylesMap.development]
    : [...(stylesMap[themeKey] ?? [])],

  /**
   * Runtime environment config passed to the app
   */
  runtimeConfig: {
    public: {
      DOMAIN: process.env.DOMAIN,
      IS_DEMO_PAGE: process.env.DEMO === 'true',
    },
  },

  /**
   * Aliases for layers (e.g. THEME_LAYER, ANALYZER_LAYER)
   * Created via `getAliasList()` from `build/alias.ts`
   */
  alias: getAliasList(),

  compatibilityDate: '2024-11-01',

  vite: {
    esbuild: { legalComments: 'none' },
    build: { rollupOptions: { plugins: [getLicensePlugin()] } },
  },

  typescript: { typeCheck: true, strict: true },

  /**
   * Nuxt build hooks
   */
  hooks: {
    /**
     * Disable route generation (e.g. for static site generation)
     */
    'prerender:routes'({ routes }) {
      routes.clear()
    },

    /**
     * Move generated LICENSES.txt file to public directory after build
     */
    'build:done': async () => {
      await moveLicenseFile(isDevelopment)
    },
  },

  eslint: { config: { stylistic: true } },

  piniaPluginPersistedstate: { storage: 'localStorage', debug: true },
})
