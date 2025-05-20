/**
 * Generates a random alphanumeric string of the specified length.
 *
 * Uses uppercase letters, lowercase letters, and digits to create an ID.
 * This utility is useful for creating unique keys, client-side identifiers,
 * or temporary IDs before saving to a database.
 *
 * @param length - The desired length of the ID. Defaults to 12.
 * @returns A randomly generated string of the given length.
 */
export function generateId(length: number = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
