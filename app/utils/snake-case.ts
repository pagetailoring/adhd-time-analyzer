/**
 * Converts camelCase or PascalCase to SNAKE_CASE
 */
export function toSnakeCase(key: string): string {
  return (
    key
      // insert underscore before each capital letter
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      // convert to upper case
      .toUpperCase()
  )
}
