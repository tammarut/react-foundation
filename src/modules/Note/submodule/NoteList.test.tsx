import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteList from './NoteList'

describe('NoteList (view component)', () => {
  test('should render the note lists properly', () => {
    // Arrange
    const fakeNotes = [{ id: Date.now(), title: 'sleep', content: 'At home' }]
    const editNoteStub = jest.fn()
    const deleteNoteStub = jest.fn()
    render(<NoteList notes={fakeNotes} onEditNote={editNoteStub} onDeleteNote={deleteNoteStub} />)
    // Act

    // Assert
    const element = screen.getByText('sleep')
    const editButton = screen.getAllByRole('button', { name: 'Edit' })
    const deleteButton = screen.getAllByRole('button', { name: 'Delete' })
    const noteLists = screen.getAllByRole('listitem')
    expect(element).toBeInTheDocument()
    expect(editButton).toHaveLength(1)
    expect(deleteButton).toHaveLength(1)
    expect(noteLists).toHaveLength(1)
  })

  test('click edit button on specific note', async () => {
    // Arrange
    const fakeNotes = [{ id: Date.now(), title: 'sleep', content: 'At home' }]
    const editNoteSpy = jest.fn()
    const deleteNoteStub = jest.fn()
    render(<NoteList notes={fakeNotes} onEditNote={editNoteSpy} onDeleteNote={deleteNoteStub} />)
    // Act
    const editButton = screen.getByRole('button', { name: 'Edit' })
    await waitFor(() => userEvent.click(editButton))

    // Assert
    expect(editNoteSpy).toHaveBeenCalledTimes(1)
  })

  test('click delete button on specific note', async () => {
    // Arrange
    const fakeNotes = [{ id: Date.now(), title: 'sleep', content: 'At home' }]
    const editNoteSpy = jest.fn()
    const deleteNoteStub = jest.fn()
    render(<NoteList notes={fakeNotes} onEditNote={editNoteSpy} onDeleteNote={deleteNoteStub} />)
    // Act
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    await waitFor(() => userEvent.click(deleteButton))
    // Assert
    expect(deleteNoteStub).toHaveBeenCalledTimes(1)
  })
})
