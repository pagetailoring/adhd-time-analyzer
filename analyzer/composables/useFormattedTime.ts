/**
 * A composable for formatting durations given in minutes.
 * Useful for displaying readable time strings like "2 h 15 min."
 */
export function useFormattedTime() {
  /**
   * Returns a human-readable string representing the given number of minutes.
   * For example: 135 => "2 h 15 min."
   *
   * @param minutes - The number of minutes to format
   * @returns A formatted string like "1 h 5 min."
   */
  const get = (minutes: number): string => `${Math.floor(minutes / 60)} h ${minutes % 60} min.`

  return {
    get,
  }
}
