/**
 * @todo Test IndexedDB ⭐️ to make the demo work without
 * Firebase, and maybe in the future for a PWA, or even
 * a desktop and mobile app using Electron.
 *
 * @autoImport { useIDBKeyval } from '@vueuse/integrations/useIDBKeyval'
 * @docs https://vueuse.org/integrations/useIDBKeyval/
 */

export const useAnalyzerFormStore = defineStore('form', () => {
  const activity = ref<string>('')
  const durationMinutes = ref<number>(25)
  const tags = ref<TimeLogTag[]>([])
  const qualityRate = ref<number>(1)
  const note = ref<string>('')

  // additional helpers selects
  const timeTags = ref<TimeLogTag[]>([])
  const trackTags = useLocalStorage<TimeLogTag[]>('toTrack', [], {
    initOnMounted: true,
  })

  function removefromArray(array: Ref<string[]>, toRemove: string) {
    const index = array.value.indexOf(toRemove)
    if (index !== -1) array.value.splice(index, 1)
  }

  // when main varlible activity/Behevior is changed set defaults i other fields
  watch(activity, (val) => setDefaults(val))

  watch(qualityRate, (val) => {
    if (val === 0) {
      removefromArray(tags, 'growth')
      tags.value.push('chaos')
      tags.value.push('fun')
    } else if (val === 2) removefromArray(tags, 'chaos')
  })

  const resetTags = () => setDefaults(activity.value)

  const getSortValue = () => Number(useDateFormat(useNow(), 'YYMMDDHHmmss').value)
  const getTime = () => useDateFormat(useNow(), 'HH:mm:ss').value
  const getDate = () => useDateFormat(useNow(), 'YYYY-MM-DD').value

  const getNewTimeLog = (): TimeLog => {
    const { userUid } = useUserAuthState()

    const log: TimeLog = {
      sort: getSortValue(),
      ts: getTime(),
      date: getDate(),
      dur: durationMinutes.value,
      act: activity.value,
      tags: tags.value,
      userId: userUid,
    }

    note.value.trim()
    if (note.value !== '') log.note = note.value
    if (qualityRate.value !== 1) log.qr = qualityRate.value

    reset()
    return log
  }

  function reset() {
    note.value = ''
    qualityRate.value = 1
  }

  function getDefaults(activity: string): MainActivityDefaults {
    return getMainActivityDefaults(activity)
  }

  function setDefaults(activity: string) {
    const { tags: defaultTags, duration } = getMainActivityDefaults(activity)
    durationMinutes.value = duration ?? 25
    tags.value = defaultTags
  }

  function init() {
    activity.value = MAIN_ACTIVITY_TAGS[0][0]
    const def = getMainActivityDefaults(activity.value)
    tags.value = def.tags
    durationMinutes.value = def.duration
  }

  // init on load
  init()

  return {
    activity,
    durationMinutes,
    tags,
    timeTags,
    trackTags,
    qualityRate,
    note,

    resetTags,

    init,
    getNewTimeLog,
    getDefaults,
  }
})
