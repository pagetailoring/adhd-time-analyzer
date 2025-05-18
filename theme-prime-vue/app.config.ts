export default defineAppConfig({
  myLayer: { name: 'PrimeVue' },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}
