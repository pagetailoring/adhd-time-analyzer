export function getSummaryStatsTable(
  dayStartAt: string,
  totalTime: string,
  totalMinutes: number,
  dayEndsAt: string
): StatsTabbleRow[] {
  return [
    { label: 'start at:', data: dayStartAt },
    { label: 'tracked:', data: totalTime, color: 'text' },
    { label: 'tracked:', data: `${totalMinutes} min.` },
    { label: 'end at:', data: dayEndsAt },
  ]
}
