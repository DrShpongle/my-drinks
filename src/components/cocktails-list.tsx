import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiDrink, BiSolidDrink } from 'react-icons/bi'
import toast from 'react-hot-toast'

import { getIngredients, Cocktail } from '@/lib/cocktails'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  addFavorite,
  removeFavorite,
  FavoriteItem,
} from '@/store/slices/favoritesSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const CocktailItem: React.FC<{ cocktail: Cocktail }> = ({ cocktail }) => {
  const favorites = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()

  const handleAddFavorite = ({ id, name, thumb }: FavoriteItem) => {
    dispatch(addFavorite({ id, name, thumb }))
    toast.success('added to favorites')
  }
  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id))
    toast.success('removed from favorites')
  }

  const isFavorite = favorites.items.find(fav => fav.id === cocktail.idDrink)

  const toggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFavorite(cocktail.idDrink)
    } else {
      handleAddFavorite({
        id: cocktail.idDrink,
        name: cocktail.strDrink,
        thumb: cocktail.strDrinkThumb,
      })
    }
  }

  const ingredientMeasures = getIngredients(cocktail)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-5 md:p-6">
        <div className="flex">
          <CardTitle className="truncate grow text-xl md:text-2xl">
            <Link href={`/${cocktail.idDrink}`} className="leading-tight">
              {cocktail.strDrink}
            </Link>
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={null}
                  className="shrink-0 self-start text-2xl cursor-pointer p-0 leading-none flex items-start betterhover:hover:text-blue-400"
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <BiSolidDrink className="text-blue-500" />
                  ) : (
                    <BiDrink />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 px-5 pb-5 md:px-6 md:pb-6">
        <Link
          href={`/${cocktail.idDrink}`}
          className="relative w-24 h-44 md:w-40 md:h-48 shrink-0 rounded-md overflow-hidden group"
        >
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
          />
        </Link>
        {ingredientMeasures.length > 0 && (
          <div>
            <h3 className="font-semibold leading-none">Ingridients:</h3>
            <ul className="list-none text-muted-foreground line-clamp-6 text-sm mt-2">
              {ingredientMeasures
                .filter(item => item.measure !== 'Garnish with')
                .map(item => {
                  return (
                    <li key={`ingridient-${item.ingredient}-${item.measure}`}>
                      - {item.ingredient}
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const CocktailsList: React.FC<{ cocktails: Cocktail[] }> = ({ cocktails }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cocktails.map(cocktail => (
        <CocktailItem key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
  )
}

export default CocktailsList
