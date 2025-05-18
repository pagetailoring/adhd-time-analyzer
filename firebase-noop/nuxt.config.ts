console.log('✅', 'Noop Fallback Layer for Firebase')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: { name: 'noop' },
  imports: { dirs: ['components', 'composable'] },
  devtools: { enabled: true },
})
