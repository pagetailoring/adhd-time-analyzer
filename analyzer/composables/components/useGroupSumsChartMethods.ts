/**
 * Provides utility methods to update reactive group sum totals based on label mappings.
 *
 * This composable exposes three focused methods for manipulating a reactive `groupSums` object:
 * - Full recalculation of group totals from an array of items.
 * - Incremental update when an item's totalTime changes.
 * - Addition of a new item to the corresponding group total.
 *
 * Intended for use in data visualizations or summary components that need to track and update
 * categorized time totals reactively.
 *
 * @param {Ref<Record<string, number>>} groupSums - A reactive object that stores numeric totals per group
 * @returns {Object} Methods for recalculating, updating, and adding to group sums
 * @keywords composable, group sums, reactive, totals, update, Vue 3, performance
 */

export function useGroupSumsChartMethods(groupSums: Ref<Record<string, number>>) {
  /**
   * Recalculates all group totals from scratch using current items.
   * @function recalculateAllGroupTotals
   * @param {SummaryItem[]} newItems - Array of items to compute sums from
   * @keywords full-recalculation, reset, total sums
   */
  function recalculateAllGroupTotals(newItems: SummaryItem[]) {
    // Reset all sums
    Object.keys(groupSums.value).forEach((key) => {
      groupSums.value[key] = 0
    })
    // Accumulate totals
    newItems.forEach((item) => {
      const group = LABEL_TO_GROUP[item.label] || 'inverted'
      groupSums.value[group] += item.totalTime
    })
  }

  /**
   * Applies a delta update for a changed item's totalTime to its group sum.
   * @function applyLabelDeltaToGroupSum
   * @param {string} label - Label identifying the group mapping
   * @param {number} oldVal - Previous totalTime value
   * @param {number} newVal - New totalTime value
   * @keywords incremental-update, delta, performance
   */
  function applyLabelDeltaToGroupSum(label: string, oldVal: number, newVal: number) {
    const group = LABEL_TO_GROUP[label] || 'inverted'
    groupSums.value[group] += newVal - oldVal
  }

  /**
   * Adds a new item value directly to its group's sum.
   * @function addNewLabelToGroupSum
   * @param {string} label - Label identifying the group mapping
   * @param {number} val - Value to add for the new item
   * @keywords addition, new-item, incremental-update
   */
  function addNewLabelToGroupSum(label: string, val: number) {
    const group = LABEL_TO_GROUP[label] || 'inverted'
    groupSums.value[group] += val
  }

  return { addNewLabelToGroupSum, applyLabelDeltaToGroupSum, recalculateAllGroupTotals }
}
