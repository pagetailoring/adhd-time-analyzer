console.log('\n\n💡', ' Analyzer main logic Layer.')
console.log('⚙️💡', '.env DOMAIN', process.env.DOMAIN, '\n')
console.log('⚙️💡', '.env USE_FIREBASE:', process.env.USE_FIREBASE, ' ⚙️')
console.log('⚙️💡', '.env IS_DEMO_PAGE', process.env.DEMO, ' ⚙️\n\n')

export default defineNuxtConfig({
  $meta: { name: 'analyzer' },
  imports: {
    dirs: [
      'data',
      'composables/crud',
      'composables/components',
      'stores',
      'types',
      'utils',
      'utils/config',
      'utils/time-logs',
    ],
  },
  devtools: { enabled: true },

  vite: {
    define: {
      IS_EXTERNAL_DB: process.env.USE_FIREBASE === 'true',
    },
  },
})
