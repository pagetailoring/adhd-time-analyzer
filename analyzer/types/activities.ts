export interface MainActivityTag {
  key: string
  label: string
  order: number
  group: string
  color: string
  defaults: {
    tags: string[]
    duration: number
  }
}

export interface MainActivityDefaults {
  tags: string[]
  duration: number
}
