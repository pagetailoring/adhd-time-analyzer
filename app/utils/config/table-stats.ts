import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'

export interface StatsTabbleRow {
  label: string
  data?: string | number
  color?: string
}

const meta = { class: { td: 'text-center', th: 'text-center' } }

export const statsColumns = <TableColumn<StatsTabbleRow>[]>[
  {
    accessorKey: 'label',
    header: 'Day',
    meta,
  },
  {
    accessorKey: 'data',
    header: 'Stats',
    meta,
    cell: ({ row }) =>
      h('div', { class: row.original.color || 'text-muted' }, row.getValue('data')),
  },
]
