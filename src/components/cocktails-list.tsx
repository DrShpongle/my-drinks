import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BiDrink, BiSolidDrink } from 'react-icons/bi'

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
  }
  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id))
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
              <TooltipTrigger>
                <Button
                  variant={null}
                  className="shrink-0 self-start text-2xl cursor-pointer p-0 leading-none flex items-start"
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
                <p>Add to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
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
            className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
          />
        </Link>
        {ingredientMeasures.length > 0 && (
          <div>
            <h3 className="font-semibold leading-none">Ingridients:</h3>
            <ul className="list-none text-zinc-600 line-clamp-6 text-sm mt-2">
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
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
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

{
  /*
    <div className="border border-border rounded-md p-3 flex gap-4 overflow-hidden">
      <Link
        href={`/${cocktail.idDrink}`}
        className="relative w-24 h-44 md:w-40 md:h-48 shrink-0 rounded-md overflow-hidden group"
      >
        <Image
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          fill
          className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
        />
      </Link>
      <div className="overflow-hidden grow">
        <div className="overflow-hidden flex justify-between w-full">
          <Link
            href={`/${cocktail.idDrink}`}
            className="font-semibold text-lg md:text-2xl block overflow-hidden hover:underline duration-150"
          >
            <h3 className="truncate">{cocktail.strDrink}</h3>
          </Link>
          <div className="shrink-0 self-start" onClick={toggleFavorite}>
            <Heart
              className={cn('hover:text-red-500 cursor-pointer duration-150', {
                'text-red-500': isFavorite,
              })}
            />
          </div>
        </div>
        {ingredientMeasures.length > 0 && (
          <ul className="list-none mt-3 text-zinc-600 line-clamp-6">
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
        )}
      </div>
    </div>
    */
}
