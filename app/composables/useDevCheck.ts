const runtime = useRuntimeConfig()
export const isDev = runtime.app.buildId === 'dev'
