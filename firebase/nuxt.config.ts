console.log('\n💡', 'Firebase Layer. With:')
console.log('  - Plugins: Initialization of Firebase app and authentication')
console.log('  - Pinia Store: Manages authentication state')
console.log('  - Components: Related to authentication UI and logic')
console.log('  - Composables: Handle authentication and Firestore operations\n')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $meta: { name: 'firebase' },
  imports: { dirs: ['stores/auth', 'composables/analyzer-crud'] },
  devtools: { enabled: true },
})
