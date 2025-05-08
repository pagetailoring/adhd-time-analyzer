export default defineAppConfig({
  myLayer: {
    name: 'ADHD Analyzer',
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
