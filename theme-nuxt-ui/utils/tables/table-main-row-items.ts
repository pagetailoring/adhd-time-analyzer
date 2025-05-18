export function getRowItems(
  removeFn: (log: TimeLog) => void,
  displayFn: (msg: string) => void
): (row: TableRow<TimeLog>) => DropdownItem[] {
  return (row) => [
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'warning',
      onSelect: () => removeFn(row.original),
    },
    // { type: 'separator' },
    {
      label: 'Copy row ID',
      onSelect: () => {
        navigator.clipboard.writeText(row.original.id ?? '')
        displayFn('Row ID copied to clipboard')
      },
    },
  ]
}
