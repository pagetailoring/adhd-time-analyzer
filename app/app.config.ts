export default defineAppConfig({
  myLayer: { name: 'the app' },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}
