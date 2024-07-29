'use client'

import * as React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { isEmpty } from 'lodash'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import { getCocktailsByName } from '@/lib/cocktails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import CocktailsList from '@/components/cocktails-list'
import Spinner from '@/components/spinner'

export default function Home() {
  const [isClient, setIsClient] = React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const [searchResults, setSearchResults] = useLocalStorage<string[]>(
    'searchResults',
    []
  )

  const mutation = useMutation({
    mutationFn: (searchTerm: string) => getCocktailsByName(searchTerm),
    onSuccess: data => {
      if (inputRef.current) {
        queryClient.setQueryData(['cocktails', inputRef.current.value], data)
        if (searchResults && inputRef.current.value && !isEmpty(data.drinks)) {
          const newSearchValue = inputRef.current.value
          const filteredSearchResults = searchResults.filter(
            result => result !== newSearchValue
          )
          setSearchResults([newSearchValue, ...filteredSearchResults])
        }
        inputRef.current.value = ''
      }
    },
  })

  console.log({ mutation })

  const handleSearch = () => {
    if (inputRef.current && inputRef.current.value.trim() !== '') {
      mutation.mutate(inputRef.current.value)
    }
  }

  const renderCocktails = () => {
    if (!mutation.data || !mutation.data.drinks) {
      return null
    }

    return <CocktailsList cocktails={mutation.data.drinks} />
  }

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="pb-32">
      <div className="container flex flex-col items-center">
        <h1 className="font-semibold text-2xl md:text-3xl">
          Find your cocktail 🍸
        </h1>
        <div className="flex items-center w-full mt-10 md:mt-20">
          <Input
            ref={inputRef}
            placeholder="Search for cocktail"
            className="rounded-r-none grow text-xl text-text"
            disabled={mutation.isPending}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
          />
          <Button
            type="button"
            className="rounded-l-none text-3xl min-w-20 bg-blue-400 betterhover:hover:bg-blue-500"
            onClick={handleSearch}
            disabled={mutation.isPending}
          >
            🍹
          </Button>
        </div>
        <div className="h-28 md:h-32 lg:h-36 flex justify-center items-center w-full">
          {mutation.isPending && <Spinner />}
          {mutation.isError && (
            <p>
              Error: {(mutation.error as Error)?.message || 'An error occurred'}
            </p>
          )}
          {(!mutation.data || !mutation.data.drinks) &&
            !mutation.isPending &&
            mutation.submittedAt !== 0 && <p>No cocktails found 😭</p>}
        </div>
        {isClient && !isEmpty(searchResults) && (
          <div className="mb-20 flex flex-col items-center">
            <h3 className="text-lg font-semibold">Recent search results:</h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {searchResults?.slice(0, 10).map(res => {
                return (
                  <Button
                    variant="outline"
                    key={res}
                    onClick={() => mutation.mutate(res)}
                  >
                    {res}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
        {mutation.isSuccess && (
          <div className="w-full">{renderCocktails()}</div>
        )}
      </div>
    </div>
  )
}
