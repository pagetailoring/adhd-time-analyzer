export const useProcessingState = defineStore('process', () => {
  const startTs = ref<number>(performance.now())
  const registry = ref<Map<string, number>>(new Map())
  const isProcess = computed(() => registry.value.size > 0)
  const isProcessing = useDebounce(isProcess, 100)
  const counter = ref<number>(0)

  const getTimeStamp = (): number => Math.round(performance.now() - startTs.value)

  const print = (val: boolean, time: number) =>
    console.log(val ? '🔄' : '✅', time, 'ms', val ? 'processing' : 'DONE', counter.value, 'tasks')

  watch(isProcessing, (val) => print(val, getTimeStamp()))

  function reset(label = '' as string) {
    print(isProcess.value, getTimeStamp())
    counter.value = 0
    startTs.value = performance.now()
    console.log('❎', getTimeStamp(), 'ms', label, '(reset)')
  }

  watchDebounced(isProcess, () => reset('auto'), { debounce: 500 })

  function trigger(label = 'day' as string) {
    reset(label)
    ping(label)
    console.log('⭐️', isProcessing.value, 'process', getTimeStamp(), 'ms')
  }

  function start(label: string, isPing = false as boolean) {
    if (!isPing) console.time(label)
    const prev = registry.value.get(label) ?? 0
    registry.value.set(label, prev + 1)
    // console.log('⬆️', getTimeStamp(), 'ms', registry.value.size, 'task', '+', label)
    counter.value++
  }

  // const icon = (no: number): string => (no === 0 ? '➡️' : '⬇️')
  function done(label: string, isPing = false as boolean) {
    if (!isPing) console.timeEnd(label)
    queueMicrotask(() => {
      const reg = registry.value
      const prev = reg.get(label) ?? 0
      if (prev <= 1) reg.delete(label)
      else reg.set(label, prev - 1)
      // console.log(icon(reg.size), getTimeStamp(), 'ms', reg.size, 'task', '-', label)
    })
  }

  function ping(label: string) {
    const isPing = true // don`t trigger console.time()
    start(label, isPing)
    setTimeout(() => done(label, isPing), 200)
  }

  return { isProcessing, getTimeStamp, start, done, ping, trigger }
})
