export type TimeLogType = string

export interface TimeLog {
  id?: string | undefined // now from firebase @todo handle it self
  sort: number // order -> Number generated from date-time with seconds, omitting the "20" from the year (e.g., 2025 → 25)
  ts: string // timestamp -> log time
  date: string // log date YYYY-MM-DD
  dur: number // duration in minutes
  act: string // main activity tag
  tags: TimeLogType[]
  userId?: string // firebase auth uid
  note?: string
  qr?: number // quality time rate activity
}

export interface TimeLogActivity {
  id: string
  tags: TimeLogType[]
  dur: number | undefined
}
