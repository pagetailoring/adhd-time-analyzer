export const useAnalyzerMemoryStore = defineStore(
  'cache',
  () => {
    const logs = ref<Record<string, TimeLog[]>>({})

    return { logs }
  },
  {
    persist: true,
  }
)
