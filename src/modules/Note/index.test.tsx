import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteModule from './'

describe('Note module', () => {
  test('A user should see NoteEditor and NoteList properly', () => {
    // Arrange
    render(<NoteModule />)
    // Act
    // Assert
    const divElement = screen.getByText('sleep')
    const header = screen.getByRole('heading', { name: /‍️note editor/i })
    expect(divElement).toBeInTheDocument()
    expect(header).toBeInTheDocument()
  })

  test('A user create a new note, it should be added to the list', async () => {
    // Arrange
    render(<NoteModule />)
    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const saveButtonEl = screen.getByRole('button', { name: 'Save' })
    await waitFor(async () => {
      await userEvent.type(titleInputEl, 'Do homework')
      await userEvent.click(saveButtonEl)
    })
    // Assert
    const newNoteElement = screen.getByText('Do homework')
    const allNotesElement = screen.getAllByRole('listitem')
    expect(newNoteElement).toBeInTheDocument()
    expect(allNotesElement).toHaveLength(2)
  })

  test('A user delete a note, it should be deleted from the list', async () => {
    // Arrange
    render(<NoteModule />)
    // Act
    const deleteButtonEl = screen.getByRole('button', { name: 'Delete' })
    await waitFor(() => userEvent.click(deleteButtonEl))
    // Assert
    const allNotesElement = screen.queryAllByRole('listitem')
    expect(allNotesElement).toHaveLength(0)
  })

  test('A user click edit button on specific note, it should be filled in the NoteEditor component', async () => {
    // Arrange
    render(<NoteModule />)
    // Act
    const editButtonEl = screen.getByRole('button', { name: 'Edit' })
    await waitFor(() => userEvent.click(editButtonEl))
    // Assert
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const contentInputEl = screen.getByRole('textbox', { name: /content/i })
    expect(titleInputEl).toHaveDisplayValue('sleep')
    expect(contentInputEl).toHaveDisplayValue('At home')
  })

  test('A user edit a note, it should be updated in the list', async () => {
    // Arrange
    const { debug } = render(<NoteModule />)
    // Act
    const editButtonEl = screen.getByRole('button', { name: 'Edit' })
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const saveButtonEl = screen.getByRole('button', { name: 'Save' })
    await waitFor(async () => {
      await userEvent.click(editButtonEl)
      await userEvent.clear(titleInputEl)
      await userEvent.type(titleInputEl, 'Take a nap')
      await userEvent.click(saveButtonEl)
    })
    // Assert
    debug()
    expect(titleInputEl).toHaveDisplayValue('')
    const divElement = screen.getByText('Take a nap')
    expect(divElement).toBeInTheDocument()
  })
})
