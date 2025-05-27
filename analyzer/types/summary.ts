export interface SummaryItem {
  label: string
  totalTime: number
  color?: string
}

export type GroupedBarStats = {
  group: string
  totalTime: number
  percent: number
}

export type StatsBuffer = {
  date?: string
  grouped?: GroupedBarStats[]
  stats: SummaryItem[]
  startAt: string
  tracked: string
  minutes: number
  endAt: string
}
