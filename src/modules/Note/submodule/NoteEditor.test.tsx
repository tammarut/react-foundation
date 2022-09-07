import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteEditor from './NoteEditor'

describe('NoteEditor (logics component)', () => {
  test('should render the note editor properly', () => {
    // Arrange
    const fakeNote = null
    const saveStub = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveStub} />)
    // Act

    // Assert
    const headerElement = screen.getByText(/Note editor/i)
    const titleLabel = screen.getByLabelText('Title')
    const titleInputEl = screen.getByPlaceholderText('Title')
    const contentInputEl = screen.getByPlaceholderText('Content')
    const saveButtonEl = screen.getByRole('button', { name: 'Save' })
    const undoButtonEl = screen.getByRole('button', { name: 'Undo' })
    const redoButtonEl = screen.getByRole('button', { name: 'Redo' })
    expect(headerElement).toBeInTheDocument()
    expect(titleLabel).toBeInTheDocument()
    expect(titleInputEl).toBeInTheDocument()
    expect(contentInputEl).toBeInTheDocument()
    expect(saveButtonEl).toBeInTheDocument()
    expect(saveButtonEl).toBeDisabled()
    expect(undoButtonEl).toBeInTheDocument()
    expect(undoButtonEl).toBeDisabled()
    expect(redoButtonEl).toBeInTheDocument()
    expect(redoButtonEl).toBeDisabled()
  })

  test('type title into input box, should display correctly', async () => {
    // Arrange
    const fakeNote = null
    const saveStub = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveStub} />)

    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    await waitFor(() => userEvent.type(titleInputEl, 'Take a nap'))

    // Assert
    expect(titleInputEl).toHaveDisplayValue('Take a nap')
  })

  test('type content into input box, should display correctly', async () => {
    // Arrange
    const fakeNote = null
    const saveStub = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveStub} />)
    // Act
    const contentInputEl = screen.getByRole('textbox', { name: /content/i })
    await waitFor(() => userEvent.type(contentInputEl, 'At home 20.00'))
    // Assert
    expect(contentInputEl).toHaveDisplayValue('At home 20.00')
  })

  test('click save button, should save new note', async () => {
    // Arrange
    const fakeNote = null
    const saveFuncSpy = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveFuncSpy} />)
    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const saveButtonEl = screen.getByRole('button', { name: 'Save' })
    await waitFor(async () => {
      await userEvent.type(titleInputEl, 'Take a nap')
      await userEvent.click(saveButtonEl)
    })
    // Assert
    expect(saveButtonEl).toBeDisabled()
    expect(saveFuncSpy).toHaveBeenCalledTimes(1)
    expect(titleInputEl).toHaveDisplayValue('')
  })

  test('type title into input box and press enter, should save new note', async () => {
    // Arrange
    const fakeNote = null
    const saveFuncSpy = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveFuncSpy} />)

    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    await waitFor(async () => {
      await userEvent.type(titleInputEl, 'Take a nap{enter}')
    })

    // Assert
    const saveButtonEl = screen.getByRole('button', { name: 'Save' })
    expect(saveButtonEl).toBeDisabled()
    expect(saveFuncSpy).toHaveBeenCalledTimes(1)
    expect(titleInputEl).toHaveDisplayValue('')
  })

  test('click undo button, should undo the last action', async () => {
    // Arrange
    const fakeNote = null
    const saveFuncSpy = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveFuncSpy} />)

    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const undoButtonEl = screen.getByRole('button', { name: 'Undo' })
    await waitFor(async () => {
      await userEvent.type(titleInputEl, 'Sleep')
      await userEvent.click(undoButtonEl)
    })
    // Assert
    expect(titleInputEl).toHaveDisplayValue('Slee')
  })

  test('click redo button, should redo the last action', async () => {
    // Arrange
    const fakeNote = null
    const saveFuncSpy = jest.fn()
    render(<NoteEditor note={fakeNote} onSave={saveFuncSpy} />)
    // Act
    const titleInputEl = screen.getByRole('textbox', { name: /title/i })
    const undoButtonEl = screen.getByRole('button', { name: 'Undo' })
    const redoButtonEl = screen.getByRole('button', { name: 'Redo' })
    await waitFor(async () => {
      await userEvent.type(titleInputEl, 'Sleep')
      await userEvent.click(undoButtonEl)
      await userEvent.click(redoButtonEl)
    })
    // Assert
    expect(titleInputEl).toHaveDisplayValue('Sleep')
  })
})
