'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFavorite, clearFavorites } from '@/store/slices/favoritesSlice'
import { isEmpty } from 'lodash'
import { MdOutlineRemoveCircle } from 'react-icons/md'
import { BiSolidDrink } from 'react-icons/bi'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Favorites() {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  const dispatch = useAppDispatch()
  const favorites = useAppSelector(state => state.favorites)

  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  const handleClearFavorites = () => {
    dispatch(clearFavorites())
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="p-0 text-2xl">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <BiSolidDrink />
            </TooltipTrigger>
            <TooltipContent>
              <p>Favorites</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col items-center">
          <h3 className="font-semibold mb-3 text-center">My Favorite Drinks</h3>
          {isEmpty(favorites.items) ? (
            <span className="text-center text-sm">
              You didn&apos;t add any drinks yet!
            </span>
          ) : (
            <>
              <ul className="space-y-2 w-full max-h-[70vh] overflow-y-scroll scrollbar-thin">
                {favorites.items.map(item => (
                  <li
                    key={item.id}
                    className="w-full flex items-center space-x-2"
                  >
                    <Link
                      href={`/${item.id}`}
                      className="overflow-hidden shrink-0 rounded-sm"
                      onClick={handleLinkClick}
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
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => handleRemoveFavorite(item.id)}
                      className="shrink-0 text-red-500 divide-purple-100"
                    >
                      <MdOutlineRemoveCircle className="text-lg" />
                    </button>
                  </li>
                ))}
              </ul>
              <Button size="sm" onClick={handleClearFavorites} className="mt-4">
                Clear Favorites
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
