import { head } from 'lodash'
import { useEffect, useState } from 'react'

export function useTimeTravel<T>(data: T) {
  const [present, setPresent] = useState(data)
  const [history, setHistory] = useState<T[]>([])
  const [future, setFuture] = useState<T[]>([])

  const handleOnUpdate = (partialData: Partial<T>) => {
    setPresent((latestPresent) => ({ ...latestPresent, ...partialData }))

    setHistory((latestHistory) => {
      return [present, ...latestHistory]
    })
  }

  const handleOnUndo = () => {
    const previousNote = head(history)
    if (!previousNote) return
    setPresent(previousNote)
    const remainingHistory = history.slice(1)
    setHistory(remainingHistory)
    setFuture((latestFuture) => [present, ...latestFuture])
  }

  const handleOnRedo = () => {
    const lastNote = head(future)
    if (!lastNote) return
    setPresent(lastNote)
    const remainingFuture = future.slice(1)
    setFuture(remainingFuture)
    setHistory((lastestHistory) => [present, ...lastestHistory])
  }

  const reset = (initialData: T) => {
    setPresent(initialData)
    setHistory([])
    setFuture([])
  }

  useEffect(() => {
    if (data) {
      setPresent(data)
    }
  }, [data])

  return {
    present,
    history,
    future,
    update: handleOnUpdate,
    undo: handleOnUndo,
    redo: handleOnRedo,
    reset: reset,
  }
}
