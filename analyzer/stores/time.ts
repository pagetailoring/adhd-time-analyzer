export const useClockStore = defineStore('clock', () => {
  const now = useNow({ interval: 60_000 }) as Ref<Date>

  const today = computed<string>((previous) => {
    const current = useDateFormat(now, 'YYYY-MM-DD').value
    return current === previous ? previous : current
  })

  return { now, today }
})
