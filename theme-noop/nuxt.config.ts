console.log('✅', 'Noop Theme Layer')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: { name: 'theme-noop' },
  imports: { dirs: ['components', 'composable'] },
  devtools: { enabled: true },
})
