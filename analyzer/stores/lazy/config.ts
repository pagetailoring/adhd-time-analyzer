export const useAppLazyStateStore = defineStore(
  'configLazy',
  () => {
    const daysAvailableToSelect = ref<number>(DAYS_TO_SELECT_LIMIT)

    const isOpenSettings = ref(false)

    const notesBuffer = ref<string[]>([])

    return { daysAvailableToSelect, isOpenSettings, notesBuffer }
  },
  {
    persist: true,
  }
)
