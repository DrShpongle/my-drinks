import { useState } from 'react'

// Utility functions for Redux
export const loadState = <T>(key: string, initialValue: T): T => {
  if (typeof window === 'undefined') {
    return initialValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(error)
    return initialValue
  }
}

export const saveState = <T>(key: string, state: T): void => {
  if (typeof window === 'undefined') {
    return
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(state))
  } catch (error) {
    console.error(error)
  }
}

// Hook for component-level use
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadState(key, initialValue)
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      saveState(key, valueToStore)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
