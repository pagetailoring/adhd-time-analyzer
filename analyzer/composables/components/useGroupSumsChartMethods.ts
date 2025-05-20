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

  return { addNewLabelToGroupSum, applyLabelDeltaToGroupSum, recalculateAllGroupTotals }
}
