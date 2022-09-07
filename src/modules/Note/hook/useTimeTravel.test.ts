import { act, renderHook } from '@testing-library/react-hooks'
import { useTimeTravel } from './useTimeTravel'

describe('useTimeTravel (custom hook)', () => {
  it('should render hook and initial values properly', () => {
    // Arrange
    const initialData = { title: '', content: '' }
    const { result } = renderHook(() => useTimeTravel(initialData))
    // Act
    // Assert
    expect(result.current.present).toStrictEqual(initialData)
    expect(result.current.history).toEqual([])
    expect(result.current.future).toEqual([])
    expect(result.current.update).toBeInstanceOf(Function)
    expect(result.current.reset).toBeInstanceOf(Function)
    expect(result.current.undo).toBeInstanceOf(Function)
    expect(result.current.redo).toBeInstanceOf(Function)
  })

  it('should update title state correctly', () => {
    // Arrange
    const initialData = { title: '', content: '' }
    const { result } = renderHook(() => useTimeTravel(initialData))
    // Act
    act(() => {
      result.current.update({ title: 'Sleep' })
    })
    // Assert
    expect(result.current.present).toEqual({ title: 'Sleep', content: '' })
    expect(result.current.history).toEqual([{ title: '', content: '' }])
  })

  it('should reset state to initial value', () => {
    // Arrange
    const initialData = { title: '', content: '' }
    const { result } = renderHook(() => useTimeTravel(initialData))
    // Act
    act(() => {
      result.current.update({ title: 'Sleep' })
      result.current.reset(initialData)
    })
    // Assert
    expect(result.current.present).toStrictEqual(initialData)
  })

  it('should undo state correctly', () => {
    // Arrange
    const initialData = { title: '', content: '' }
    const { result } = renderHook(() => useTimeTravel(initialData))
    // Act
    act(() => {
      result.current.update({ title: 'Sleep' })
    })
    act(() => result.current.update({ title: 'SleepA' }))
    act(() => result.current.undo())
    // Assert
    expect(result.current.present).toEqual({ title: 'Sleep', content: '' })
    expect(result.current.future).toEqual([{ title: 'SleepA', content: '' }])
  })

  it('should redo state correctly', async () => {
    // Arrange
    const initialData = { title: '', content: '' }
    const { result, waitFor } = renderHook(() => useTimeTravel(initialData))
    // Act
    act(() => result.current.update({ title: 'Sleep' }))
    act(() => result.current.update({ title: 'Sleep well' }))
    act(() => result.current.undo())
    await waitFor(() => expect(result.current.present).toEqual({ title: 'Sleep', content: '' }))

    act(() => result.current.redo())
    // Assert
    expect(result.current.present).toEqual({ title: 'Sleep well', content: '' })
  })
})
