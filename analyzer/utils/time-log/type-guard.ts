// declare const IS_EXTERNAL_DB: boolean

/**
 * Type guard: checks if a value conforms to TimeLog and is ready to save.
 */
export function isTimeLogValid(o: unknown): o is TimeLog {
  if (o === null || typeof o !== 'object') {
    return false
  }
  const obj = o as Record<string, unknown>

  // id: optional, if present must be a string
  const hasValidId = obj.id === undefined || typeof obj.id === 'string'

  // sort: required, must be a number
  const hasValidSort = typeof obj.sort === 'number'

  // ts: required, must be a string
  const hasValidTs = typeof obj.ts === 'string'

  // date: required, must be a string
  const hasValidDate = typeof obj.date === 'string'

  // dur: required, must be a number
  const hasValidDur = typeof obj.dur === 'number'

  // act: required, must be a string
  const hasValidAct = typeof obj.act === 'string'

  // tags: required, must be an array of strings
  const hasValidTags = Array.isArray(obj.tags) && obj.tags.every((tag) => typeof tag === 'string')

  // note: optional, if present must be a string
  const hasValidNote = obj.note === undefined || typeof obj.note === 'string'

  // qr: optional, if present must be a number
  const hasValidQr = obj.qr === undefined || typeof obj.qr === 'number'

  // userId: optional, if present must be a string;
  // if saving to external DB, userId is required and must be a string
  const hasValidUserId = true
  // IS_EXTERNAL_DB && isSave
  //   ? typeof obj.userId === 'string'
  //   : obj.userId === undefined || typeof obj.userId === 'string'
  console.log('@todo !!!! load mode, check user or not')

  return (
    hasValidId &&
    hasValidSort &&
    hasValidTs &&
    hasValidDate &&
    hasValidDur &&
    hasValidAct &&
    hasValidTags &&
    hasValidNote &&
    hasValidQr &&
    hasValidUserId
  )
}
