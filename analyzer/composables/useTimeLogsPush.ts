export function useTimeLogsPush() {
  function pushNewRecord(newRecord: TimeLog, tableInStore: Ref<TimeLog[]>) {
    /**
     * Using Reactive Data with Table from Nuxt UI aka. using TanStack Tables
     * @see {@link https://tanstack.com/table/latest/docs/framework/vue/guide/table-state#using-reactive-data}
     *
     * ⚠️ shallowRef is used under the hood for performance reasons,
     * meaning that the data is not deeply reactive, only the .value is.
     * To update the data you have to mutate the data directly.
     */

    tableInStore.value = [...tableInStore.value, newRecord]
  }
  const { start, done } = useProcessingState()

  function pushNewRecords(newEntries: TimeLog[], tableInStore: Ref<TimeLog[]>) {
    start('PUSH')
    // 🍍 Handle new data, merge new entries using shallow update composable
    for (const entry of newEntries) pushNewRecord(entry, tableInStore)
    done('PUSH')
  }

  return { pushNewRecord, pushNewRecords }
}
