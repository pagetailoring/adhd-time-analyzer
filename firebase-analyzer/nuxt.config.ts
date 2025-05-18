console.log('✅', 'Firebase Analyzer Layer - composables connecting analyzer logic with Firebase')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: { name: 'firebase-analyzer' },
  // imports: { dirs: ['stores/auth', 'composables/analyzer'] },
  devtools: { enabled: true },
})
