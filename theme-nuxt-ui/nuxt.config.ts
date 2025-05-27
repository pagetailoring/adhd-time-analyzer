console.log('\n✅', 'Nuxt UI Theme Layer')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  $meta: { name: 'theme-nuxt-ui' },
  imports: {
    dirs: ['components', 'components/app', 'components/new-logs', 'composable', 'types', 'utils'],
  },
  devtools: { enabled: true },
})
