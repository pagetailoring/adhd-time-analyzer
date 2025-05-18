import type { TableColumn } from '@nuxt/ui'

export const columns: TableColumn<TimeLog>[] = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'sort', header: '#' },
  {
    id: 'ts',
    accessorKey: 'ts',
    header: 'Log',
    meta: { class: { td: 'text-center min-w-8', th: 'text-center min-w-8' } },
    cell: ({ row }) => h('small', { class: 'log' }, row.getValue<'ts'>('ts').slice(0, 5)),
  },

  {
    id: 'timeAgo',
    header: 'From now',
    meta: { class: { td: 'text-center w-15', th: 'text-center w-15' } },
    cell: ({ row }) => {
      const date = row.getValue<string>('date')
      const time = row.getValue<string>('ts')
      const ago = useTimeAgo(new Date(`${date}T${time}`)).value
      return ago.replace('minutes', 'min.')
    },
  },
  {
    id: 'dur',
    accessorKey: 'dur',
    header: 'Pomodoro', // @todo <wbr>
    meta: { class: { td: 'text-center min-w-11', th: 'text-center max-w-11' } },
    cell: ({ row }) => `${row.getValue<number>('dur')} min.`,
  },
  {
    accessorKey: 'act',
    header: 'Main',
    meta: { class: { th: 'pl-5 w-14', td: 'sticky left-0 pl-3 z-10 w-14' } },
  },
  { accessorKey: 'date', header: 'Date' },
  {
    accessorKey: 'tags',
    header: 'Tags',
    meta: { class: { th: 'sticky left-3 z-10 w-40', td: 'whitespace-normal min-w-[40rem] w-40' } },
  },

  {
    accessorKey: 'note',
    header: 'Note',
  },
  { accessorKey: 'userId', header: 'User ID' },
  {
    id: 'actions',
    header: '',
    meta: { class: { td: 'text-right', th: 'w-8' } },
  },
]
