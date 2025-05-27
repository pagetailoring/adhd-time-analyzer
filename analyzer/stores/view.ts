export const useAnalyzerViewStore = defineStore('view', () => {
  // Path for external operations (e.g. delete/save in firestore modules)
  const path = 'logs'

  // 🍍 Display state ---
  const timeLogsToDisplay = ref<TimeLog[]>([])
  const arrayToDisplay = useDebounce(timeLogsToDisplay, 100)

  const { today } = storeToRefs(useClockStore())
  const dayToLoadDate = ref<string>(today.value)
  const dayToDisplayDate = ref<string>(today.value)

  const displayedDaysCount = ref<number>(0)
  const isTodayDataDisplayed = computed(() => dayToDisplayDate.value === today.value)

  // 🍍 helper to push via shallowRef table updates
  const { pushNewRecords } = useTimeLogsPush()
  const { processEdgeCases } = useEdgeCases(
    dayToDisplayDate,
    dayToLoadDate,
    isTodayDataDisplayed,
    clearDisplayedData
  )

  // 🍍 Data fetching logic ----------------
  const { fetchDayData } = useAnalyzerRead()

  // @dev
  const { start, done } = useProcessingState()

  async function getNewDayData(date: string) {
    start('get')
    // Original logic now uses fetchDayData
    const forceDbFetch = IS_EXTERNAL_DB && isTodayDataDisplayed.value
    const raw = await fetchDayData(date, path, forceDbFetch)
    processIncomingData(raw)
    done('get')
  }

  function processIncomingData(newEntries: TimeLog[]) {
    console.time('process incoming')
    // Merge new entries, sort, update counters, and handle edge cases
    // 🍍 Handle new data, merge new entries using shallow update composable
    pushNewRecords(newEntries, timeLogsToDisplay)
    // 🍍 Sort entire list before processing
    timeLogsToDisplay.value = sortTimeLogs(timeLogsToDisplay.value)
    // 🍍 Edge cases
    displayedDaysCount.value++
    processEdgeCases(timeLogsToDisplay, displayedDaysCount)
    console.timeEnd('process incoming')
  }

  function clearDisplayedData() {
    timeLogsToDisplay.value = []
    displayedDaysCount.value = 0
  }

  async function updateDisplayedDataOnDayChange(date: string) {
    if (!isTodayDataDisplayed.value) {
      const { useDayTablesCacheBufferStore } = await import('../stores/buffer/tables')
      const { isDayInTableCache } = storeToRefs(useDayTablesCacheBufferStore())

      // Cancel data processing if data exists in cache memory
      if (isDayInTableCache.value) return
    }

    clearDisplayedData()
    if (dayToLoadDate.value === date) getNewDayData(date)
    else dayToLoadDate.value = date
  }

  // 🍍 Reactively reset data when the display date changes
  watch(dayToDisplayDate, updateDisplayedDataOnDayChange)

  // 🍍 Automatically fetch data when the load date changes
  watchImmediate(dayToLoadDate, getNewDayData)

  return {
    timeLogsToDisplay,
    arrayToDisplay,

    processIncomingData,

    path,
    dayToDisplayDate,
    dayToLoadDate,
    isTodayDataDisplayed,
  }
})
