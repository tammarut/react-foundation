import { Note } from '../entity/Note'

interface Props {
  notes: Note[]
  onEditNote(note: Note): void
  onDeleteNote(note: Note): void
}

function NoteList(props: Props) {
  const { notes, onEditNote, onDeleteNote } = props

  return (
    <>
      {notes.map((note, index) => {
        return (
          <div role={'listitem'} key={index} style={{ borderBottom: '1px solid #e5e5e5' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1rem' }}>{note.title}</p>
            <p style={{ fontWeight: 'lighter', fontSize: '0.75rem' }}>
              {(note.content || '').slice(0, 40)}
            </p>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => {
                  onEditNote(note)
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDeleteNote(note)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default NoteList
