export default defineAppConfig({
  myLayer: {
    name: 'firebase-analyzer',
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
