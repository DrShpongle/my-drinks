'use client'
import * as React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getCocktailsByName } from '@/lib/cocktails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Cocktail {
  idDrink: string
  strDrink: string
  // Add other properties as needed
}

export default function Home() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (searchTerm: string) => getCocktailsByName(searchTerm),
    onSuccess: data => {
      if (inputRef.current) {
        queryClient.setQueryData(['cocktails', inputRef.current.value], data)
        inputRef.current.value = ''
      }
    },
  })

  const handleSearch = () => {
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      mutation.mutate(inputRef.current.value)
    }
  }

  const renderCocktails = () => {
    if (!mutation.data || !mutation.data.drinks) {
      return <p>No cocktails found.</p>
    }

    return (
      <ul>
        {mutation.data.drinks.map((drink: Cocktail) => (
          <li key={drink.idDrink}>{drink.strDrink}</li>
        ))}
      </ul>
    )
  }

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
      {mutation.isPending && <p>Loading...</p>}
      {mutation.isError && (
        <p>
          Error: {(mutation.error as Error)?.message || 'An error occurred'}
        </p>
      )}
      {mutation.isSuccess && renderCocktails()}
    </div>
  )
}
