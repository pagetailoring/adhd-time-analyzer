export interface MainActivityTag {
  key: string
  label: string
  orderInSelect: number
  groupInSelect: string
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
