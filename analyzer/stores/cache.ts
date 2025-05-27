export const useAnalyzerMemoryStore = defineStore(
  'cache',
  () => {
    const logs = ref<Record<string, TimeLog[]>>({})

    const stats = ref<Record<string, StatsBuffer>>({})
    const days = ref<Record<string, TimeLog[]>>({})

    return { logs, stats, days }
  },
  {
    persist: true,
  }
)
