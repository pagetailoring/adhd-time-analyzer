console.log('✅', 'Analyzer Main Logic Layer')

export default defineNuxtConfig({
  $meta: { name: 'analyzer' },
  imports: {
    dirs: [
      'data',
      'composables/cache',
      'composables/crud',
      'composables/components',
      'stores',
      'stores/buffer',
      'types',
      'utils',
      'utils/config',
      'utils/colors',
      'utils/time-log',
      'utils/time-logs',
    ],
  },
  devtools: { enabled: true },

  vite: {
    define: {
      IS_EXTERNAL_DB: process.env.USE_FIREBASE === 'true',
      UI_THEME: process.env.THEME,
    },
  },
})
