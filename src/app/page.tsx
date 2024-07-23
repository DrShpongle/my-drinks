'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getCocktailsByName } from '@/lib/cocktails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Home() {
  const [cocktail, setCocktail] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const {
    data = [],
    isPending,
    isError,
    error,
    status,
    isFetching,
    fetchStatus,
    isSuccess,
  } = useQuery({
    queryKey: ['cocktails'],
    queryFn: async () => await getCocktailsByName(cocktail),
    enabled: cocktail !== '',
  })

  const handleSearch = () => {
    if (inputRef?.current?.value && inputRef.current.value.trim() !== '') {
      setCocktail(inputRef.current.value)
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      if (inputRef?.current?.value) {
        inputRef.current.value = ''
      }
      setCocktail('')
    }
  }, [isSuccess])

  return (
    <div className="flex flex-col items-center max-w-screen-lg w-full mx-auto">
      <h1>Drinks</h1>
      <div className="flex items-center w-full">
        <Input
          ref={inputRef}
          placeholder="Search for cocktail"
          className="rounded-r-none grow"
        />
        <Button type="button" className="rounded-l-none" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  )
}
