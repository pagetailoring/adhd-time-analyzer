import type { ColumnSlots } from 'primevue/column'

type BodySlotProps<T> = Omit<Parameters<ColumnSlots['body']>[0], 'data'> & {
  data: T
}

export type TableRow<TData> = BodySlotProps<TData>
