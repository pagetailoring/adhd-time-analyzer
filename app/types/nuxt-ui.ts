import type { DefineComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { ColumnSort } from '@tanstack/vue-table'

export type DropdownItem = {
  label: string
  icon?: string
  color?: string
  onSelect?: () => void
}

export type NuxtUiColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutral'

declare module '@nuxt/ui' {
  export const UTable: DefineComponent<{
    data: SummaryItem[]
    columns: TableColumn<SummaryItem>[]
    sorting?: ColumnSort[]
  }>
}

type Side = 'top' | 'right' | 'bottom' | 'left'
export interface TooltipContentConfig {
  side: Side
  align?: 'start' | 'center' | 'end'
}
