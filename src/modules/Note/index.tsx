import { useState } from 'react'
import { Note } from './entity/Note'
import NoteEditor from './submodule/NoteEditor'
import NoteList from './submodule/NoteList'

const INITIAL_NOTES: Note[] = [{ id: Date.now(), title: 'sleep', content: 'At home' }]

export default function NoteModule() {
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES)
  const [selectedNote, setSelectedNote] = useState<Optional<Note>>(null)

  const handleOnSave = (note: Note) => {
    if (selectedNote) {
      setNotes((latestNotes) =>
        latestNotes.map((currentItem) => {
          const matched = currentItem.id === selectedNote.id
          if (!matched) {
            return currentItem
          }
          return { ...currentItem, title: note.title, content: note.content }
        })
      )
      setSelectedNote(null)
      return
    }
    setNotes((latestNotes) => [{ ...note, id: Date.now() }, ...latestNotes])
  }

  const handleOnEditNote = (note: Note) => {
    setSelectedNote(note)
  }

  const handleOnDeleteNote = (note: Note) => {
    const remainingNotes = notes.filter((currentNote) => currentNote.id !== note.id)
    setNotes(remainingNotes)
  }

  return (
    <>
      {/* Note lists */}
      <section
        role={'list'}
        style={{ flexBasis: 120, borderRight: '1px solid #e5e5e5', padding: '1rem' }}
      >
        <NoteList notes={notes} onEditNote={handleOnEditNote} onDeleteNote={handleOnDeleteNote} />
      </section>

      {/* Note Editor */}
      <section>
        <NoteEditor note={selectedNote} onSave={handleOnSave} />
      </section>
    </>
  )
}
