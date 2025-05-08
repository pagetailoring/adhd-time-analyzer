export function getLogDate(log: TimeLog): Date {
  return new Date(`${log.date}T${log.ts}`)
}
