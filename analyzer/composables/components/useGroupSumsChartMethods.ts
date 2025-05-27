import { getActTagColor } from '../../utils/colors/get-act-tag-color'

/**
 * Provides utility methods to update reactive group sum totals based on label mappings.
 *
 * @param {Ref<Record<string, number>>} groupSums - A reactive object that stores numeric totals per group
 * @returns {Object} Methods for recalculating, updating, and adding to group sums
 * @keywords composable, group sums, reactive, totals, update, Vue 3, performance
 */

export function useGroupSumsChartMethods(groupSums: Ref<Record<string, number>>) {
  /**
   * Recalculations utility
   */
  function groupSumsUpdate(label: string, value: number) {
    groupSums.value[getActTagColor(label)] += value
  }

  /**
   * Recalculates all group totals from scratch using current items.
   * @function recalculateAllGroupTotals
   * @param {SummaryItem[]} newItems - Array of items to compute sums from
   */
  function recalculateAllGroupTotals(newItems: SummaryItem[]) {
    // Reset all sums
    Object.keys(groupSums.value).forEach((key) => {
      groupSums.value[key] = 0
    })
    // Accumulate totals
    newItems.forEach((item) => {
      groupSumsUpdate(item.label, item.totalTime)
    })
  }

  /**
   * Applies a delta update for a changed item's totalTime to its group sum.
   * @function applyLabelDeltaToGroupSum
   * @param {string} label - Label identifying the group mapping
   * @param {number} oldVal - Previous totalTime value
   * @param {number} newVal - New totalTime value
   */
  function applyLabelDeltaToGroupSum(label: string, oldVal: number, newVal: number) {
    groupSumsUpdate(label, newVal - oldVal)
  }

  /**
   * Adds a new item value directly to its group's sum.
   * @function addNewLabelToGroupSum
   * @param {string} label - Label identifying the group mapping
   * @param {number} val - Value to add for the new item
   */
  const addNewLabelToGroupSum = (label: string, val: number) => groupSumsUpdate(label, val)

  const { start, done } = useProcessingState()

  // Internal previous state for incremental updates
  let previousData: SummaryItem[] = []

  function updateGroupSumsIncrementallyOrFully(newData: SummaryItem[]) {
    start('4grs')

    if (newData.length === previousData.length) {
      for (let i = 0; i < newData.length; i++) {
        const newItem = newData[i]
        const oldItem = previousData[i]
        if (newItem.label === oldItem.label && newItem.totalTime !== oldItem.totalTime) {
          applyLabelDeltaToGroupSum(newItem.label, oldItem.totalTime, newItem.totalTime)
          previousData = [...newData]
          done('4grs')
          return
        }
      }
    }

    // Case: one item added
    if (newData.length === previousData.length + 1) {
      const added = newData.find(
        (item) =>
          !previousData.some((old) => old.label === item.label && old.totalTime === item.totalTime)
      )
      if (added) {
        addNewLabelToGroupSum(added.label, added.totalTime)
        previousData = [...newData]
        done('4grs')
        return
      }
    }

    // Fallback: full recalculation
    recalculateAllGroupTotals(newData)
    previousData = [...newData]
    done('4grs')
  }

  /**
   * Computed array of group sums with percentage of total.
   * @computed groupedArray
   * @returns Array of objects with group, totalTime, and percent fields
   * @keywords computed, percentage, visualization
   */
  function calculateGroupedArray(groupSums: Record<ColorKey, number>): GroupedBarStats[] {
    const total = Object.values(groupSums).reduce((acc, val) => acc + val, 0)
    return Object.entries(groupSums)
      .filter(([, val]) => val > 0)
      .map(([group, totalTime]) => ({
        group,
        totalTime,
        percent: total ? (totalTime / total) * 100 : 0,
      }))
  }

  return { calculateGroupedArray, updateGroupSumsIncrementallyOrFully }
}
