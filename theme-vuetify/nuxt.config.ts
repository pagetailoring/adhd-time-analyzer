console.log('✅', 'Vuetify Theme Layer')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['vuetify-nuxt-module'],

  $meta: { name: 'theme-vuetify' },
  imports: { dirs: ['components', 'composable', 'types'] },
  devtools: { enabled: true },

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts',
  },
})
