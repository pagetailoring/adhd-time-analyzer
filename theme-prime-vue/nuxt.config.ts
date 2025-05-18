import Aura from '@primeuix/themes/aura'

console.log('✅', 'PrimeVue Theme Layer')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module'],
  $meta: { name: 'theme-prime-vue' },
  imports: { dirs: ['components', 'composable', 'utils', 'types'] },
  devtools: { enabled: true },

  primevue: {
    components: {
      include: [
        'Button',
        'Skeleton',
        'Card',
        'DataTable',
        'Column',
        'Tag',
        'InputGroup',
        'Select',
        'MultiSelect',
        'Toolbar',
        'InputText',
      ],
      exclude: ['Form', 'FormField', 'Chart', 'Quill', 'Editor'],
    },
    // usePrimeVue: false,
    autoImport: false,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'system',
          overrides: {},
        },
      },
    },
  },
})
