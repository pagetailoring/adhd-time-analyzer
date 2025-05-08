export default defineAppConfig({
  myLayer: {
    name: 'firebase',
  },
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
