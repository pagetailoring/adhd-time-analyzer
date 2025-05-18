export default defineAppConfig({
  myLayer: { name: 'theme noop' },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}
