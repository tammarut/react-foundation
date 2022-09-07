import { isEmpty } from 'lodash'
import { KeyboardEvent, useMemo } from 'react'
import { Note } from '../entity/Note'
import { useTimeTravel } from '../hook/useTimeTravel'

interface Props {
  note: Optional<Note>
  onSave(note: Note): void
}

function NoteEditor({ note, onSave }: Props) {
  const initialNote: Note = useMemo(() => ({ id: Date.now(), title: '', content: '' }), [])
  const {
    present: { title, content },
    history,
    future,
    update,
    reset,
    undo,
    redo,
  } = useTimeTravel<Note>(note ?? initialNote)

  const handleOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSave({ id: Date.now(), title, content })
      reset(initialNote)
    }
  }

  return (
    <>
      <h1 style={{ fontSize: '1.25rem' }}>‍️Note editor</h1>
      <label htmlFor="title">Title</label>
      <div>
        <input
          placeholder="Title"
          id="title"
          value={title}
          onChange={(event) => {
            update({ title: event.target.value })
          }}
          onKeyPress={handleOnKeyPress}
        />
      </div>
      <label htmlFor="content">Content</label>
      <div>
        <textarea
          placeholder="Content"
          id="content"
          value={content}
          onChange={(event) => {
            update({ content: event?.target.value })
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <button disabled={isEmpty(history)} onClick={undo}>
          Undo
        </button>
        <button disabled={isEmpty(future)} onClick={redo}>
          Redo
        </button>
        <button
          style={{ width: 80 }}
          disabled={isEmpty(title)}
          onClick={() => {
            onSave({ id: Date.now(), title, content })
            reset(initialNote)
          }}
        >
          Save
        </button>
      </div>
    </>
  )
}

export default NoteEditor
