/**
 * Maps theme keys to their corresponding Nuxt layer directories.
 * Used to dynamically extend Nuxt config based on the selected UI theme.
 *
 * Keys correspond to values of the `UI_THEME` environment variable.
 * Each value is a relative path to the Nuxt layer(s) that implement that theme.
 */
export const themeMap: Record<Theme, string[]> = {
  nuxtUi: ['../theme-nuxt-ui'],
  primeVue: ['../theme-prime-vue'],
  vuetify: ['../theme-vuetify'],
  noop: ['../theme-noop'], // Fallback or empty theme
}

// List of valid .env.UI_THEME values for tests!!
export const validThemes: Theme[] = ['nuxtUi', 'primeVue', 'vuetify', 'noop']

/**
 * Maps theme keys to corresponding CSS entry points for inclusion in the Nuxt app.
 *
 * Keys match `themeMap` keys and an optional 'development' key for dev-only styles.
 * Values should be layer-relative paths to the main CSS files.
 */
export const stylesMap: Record<StylesKey, string[]> = {
  nuxtUi: ['NUXT_UI_LAYER/assets/styles/main.css'],
  primeVue: ['PRIME_VUE_LAYER/assets/styles/main.css'],
  vuetify: ['VUETIFY_LAYER/assets/styles/main.css'],
  development: ['~/assets/styles/dev.css'], // Applied only during development
  noop: [], // No styles for fallback theme
}

/**
 * Maps whether Firebase should be used to the appropriate set of memory-related layers.
 *
 * The key is a stringified boolean ('true' or 'false'), typically derived from the `USE_FIREBASE` env var.
 * These layers provide implementation for data storage (e.g. Firebase or noop).
 */
export const memoryMap: Record<'true' | 'false', string[]> = {
  true: ['../firebase', '../firebase-analyzer', '../analyzer'],
  false: ['../firebase-noop', '../analyzer'],
}

/**
 * Names of directories for which aliases should be automatically generated.
 * Used by `getAliasList()` in `build/alias.ts` to create alias constants like `ANALYZER_LAYER`.
 */
export const layerDirNamesForAliases = ['analyzer']
