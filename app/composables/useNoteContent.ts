import type { Row } from '@tanstack/vue-table'

export function useNoteContent() {
  function noteContent(row: Row<TimeLog>): string {
    return row.getValue('note') || ''
  }

  function noteLength(row: Row<TimeLog>): number {
    const note = noteContent(row) as string
    return note && note.length ? note.length : 0
  }
  const isNote = (row: Row<TimeLog>): boolean => !(noteLength(row) === 0)

  const isNoteInTagsSection = (row: Row<TimeLog>): boolean =>
    noteLength(row) <= SHORT_NOTE_MAX_LENGTH && isNote(row)

  return { isNote, isNoteInTagsSection, noteLength, noteContent }
}
