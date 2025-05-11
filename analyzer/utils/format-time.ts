/**
 * A utility function for formatting durations given in minutes.
 * Useful for displaying readable time strings like "2 h 15 min."
 *
 * @param minutes - The number of minutes to format
 * @returns A formatted string like "1 h 5 min."
 */
export function formatTime(minutes: number): string {
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min.`
}
