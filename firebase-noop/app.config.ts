export default defineAppConfig({
  myLayer: { name: 'noop' },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}
