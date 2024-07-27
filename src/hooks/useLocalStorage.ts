import { useState, useEffect } from 'react'

// Type definition for the hook's return type
type UseLocalStorage<T> = [T | undefined, (value: T) => void]

// Custom hook for local storage
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorage<T> {
  // State to store the value
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    }
    return initialValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    }
  }, [key, storedValue])

  // Function to set the value in local storage
  const setValue = (value: T) => {
    setStoredValue(value)
  }

  return [storedValue, setValue]
}
