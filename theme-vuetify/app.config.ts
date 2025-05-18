export default defineAppConfig({
  myLayer: { name: 'Vuetify' },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}
