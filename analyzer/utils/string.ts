export function stringCapitalize(item: string): string {
  return item.charAt(0).toUpperCase() + item.slice(1)
}

export function normalizeString(key: string | undefined): string {
  return key?.toLowerCase().trim() || ''
}
