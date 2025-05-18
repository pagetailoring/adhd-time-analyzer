// vuetify.config.ts
import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#343434',
          surface: '#262626',
        },
      },
    },
  },
  defaults: {
    global: {
      variant: 'solo',
      density: 'compact',
    },
    VBtn: { elevation: 2 },
    VCard: { elevation: 1 },
  },
})
