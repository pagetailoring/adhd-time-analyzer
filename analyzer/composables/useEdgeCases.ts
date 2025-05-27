/**
 * Processes special edge cases based on time of day.
 * Handles missing logs or logs recorded at night, ensuring correct day separation.
 */

const getNowHour = (now: Ref<Date, Date>): number => Number(useDateFormat(now, 'HH').value)
const getHourFromLog = (log: TimeLog): number => Number(log.ts.slice(0, 2))
const isNightTime = (hour: number): boolean => hour <= NIGHT_TIME_END_HOUR
const isDayTime = (hour: number): boolean => hour >= DAY_TIME_START_HOUR

export function useEdgeCases(
  dayToDisplayDate: Ref<string>,
  dayToLoadDate: Ref<string>,
  isTodayDataDisplayed: Ref<boolean>,
  clearDisplayedData: () => void
) {
  const { detectDayStart } = useEffectiveNightGapAutoDetect()
  const { now } = storeToRefs(useClockStore())

  function processFirstLogOfDayCycle(
    logs: Ref<TimeLog[]>,
    nowHour: number,
    displayedDaysCount: Ref<number>
  ) {
    const logHour = getHourFromLog(logs.value[0])

    // ⚙️ First log is from night time
    if (isNightTime(logHour)) {
      // ⚙️ Case: user working at night (after midnight)
      if (isNightTime(nowHour) && displayedDaysCount.value <= 1) fetchDayBeforeData()
      else if (isDayTime(nowHour)) {
        // ⚙️ If current time is daytime and we’ve “slept” past the threshold, Clear Logs
        const lastLogHour = getHourFromLog(logs.value[logs.value.length - 1])
        const hoursSinceLastLog = nowHour - lastLogHour
        if (hoursSinceLastLog > AUTO_DETECT_SLEEP_THRESHOLD_HOURS) {
          clearDisplayedData()
          console.log('\n' + edgeIcon, 'Clear data at the beginning of daytime\n\n')
        }
      }

      // don't process if we cleared, we can to add return in line above
      if (logs.value.length) {
        // ⚙️ Clear displayed data `Before Cutoff`
        const cutoffLogId = detectDayStart(logs.value)
        const cutDown = true
        logs.value = sliceTimeLogs(logs.value, cutoffLogId, cutDown)
      }
    }
  }

  const message = '⚙️ Processing logs:'
  const { start, done } = useProcessingState()

  function processEdgeCases(logs: Ref<TimeLog[]>, displayedDaysCount: Ref<number>) {
    start('edgeCases')
    // ⚙️ processing edge cases
    const nowHour = getNowHour(now)
    const length = logs.value.length

    console.log(message, length, '⚙️')

    if (length === 0) {
      // ⚙️ Case: work around midnight, fetch data from day before
      if (isNightTime(nowHour)) fetchDayBeforeData()
    } else {
      // ⚙️ length > 0 -> we have data in table
      processFirstLogOfDayCycle(logs, nowHour, displayedDaysCount)

      if (!isTodayDataDisplayed.value) {
        if (displayedDaysCount.value === 1) {
          // ⚙️ Case: past day fetch next day
          const nextDayDate = getShiftedDateString(dayToDisplayDate.value, 1)
          getDayData(nextDayDate)
        } else {
          // ⚙️ Case: past day cuting days up
          // ⚙️ Clear displayed data `After Cutoff`
          const cutoffLogId = detectDayStart(logs.value)
          const cutDown = false
          logs.value = sliceTimeLogs(logs.value, cutoffLogId, cutDown)
        }
      }
    }

    console.log(message, length, 'end.')
    done('edgeCases')
  }

  // helpers
  function fetchDayBeforeData() {
    const dayBefore = getShiftedDateString(dayToLoadDate.value, -1)
    getDayData(dayBefore)
  }

  function getDayData(date: string) {
    // 🍍 refresh will auto-run via composable watch 🔥
    dayToLoadDate.value = date
  }

  return { processEdgeCases }
}
