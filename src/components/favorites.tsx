'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFavorite, clearFavorites } from '@/store/slices/favoritesSlice'
import { isEmpty } from 'lodash'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Favorites() {
  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites)

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  const handleClearFavorites = () => {
    dispatch(clearFavorites())
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-semibold text-center">My Drinks</h3>
      {isEmpty(favorites.items) ? (
        <span className="text-center mt-2">
          You didn&apos;t add any drinks yet!
        </span>
      ) : (
        <>
          <ul className="space-y-2 w-full mt-2">
            {favorites.items.map(item => (
              <li key={item.id} className="w-full flex items-center space-x-2">
                <Link
                  href={`/${item.id}`}
                  className="overflow-hidden shrink-0 rounded-sm"
                >
                  <Image
                    src={item.thumb}
                    alt={item.name}
                    width={44}
                    height={44}
                  />
                </Link>
                <Link
                  href={`/${item.id}`}
                  className="grow overflow-hidden truncate"
                >
                  {item.name}
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="shrink-0 hover:text-red-500 divide-purple-100"
                >
                  <Trash2 className="text-sm" />
                </button>
              </li>
            ))}
          </ul>
          {/* <p>Total: ${favorites.total.toFixed(2)}</p> */}
          <Button size="sm" onClick={handleClearFavorites} className="mt-4">
            Clear Favorites
          </Button>
        </>
      )}
    </div>
  )
}
