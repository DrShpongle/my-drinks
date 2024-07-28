'use client'

import * as React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { BiDrink } from 'react-icons/bi'
import { TbComponents } from 'react-icons/tb'
import { TbGlassCocktail } from 'react-icons/tb'
import { TbLemon } from 'react-icons/tb'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  addFavorite,
  removeFavorite,
  FavoriteItem,
} from '@/store/slices/favoritesSlice'
import { getCocktailById, getIngredients } from '@/lib/cocktails'
import { Button } from '@/components/ui/button'

const CocktailPage = ({ params }: { params: { cocktailId: string } }) => {
  const favorites = useAppSelector(state => state.favorites)
  const dispatch = useAppDispatch()

  const handleAddFavorite = ({ id, name, thumb }: FavoriteItem) => {
    dispatch(addFavorite({ id, name, thumb }))
  }
  const handleRemoveFavorite = (id: string) => {
    dispatch(removeFavorite(id))
  }

  const { cocktailId } = params
  const {
    data,
    isPending,
    isError,
    error,
    status,
    isFetching,
    fetchStatus,
    isSuccess,
  } = useQuery({
    queryKey: ['cocktail', cocktailId],
    queryFn: async () => await getCocktailById(cocktailId),
  })
  const cocktail = data?.drinks?.[0]
  const ingridients = cocktail ? getIngredients(cocktail) : null
  const coreIngridients = ingridients?.filter(
    ing => ing.measure !== 'Garnish with'
  )
  const igridientsForGarnish = ingridients?.filter(
    ing => ing.measure === 'Garnish with'
  )

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

  return cocktail ? (
    <div>
      <div className="flex items-center flex-col space-y-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold">
          {cocktail.strDrink}
        </h1>
        <Button className="space-x-2" onClick={toggleFavorite}>
          <span>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </span>
          <BiDrink size={16} />
        </Button>
      </div>
      <div className="container mt-10 md:mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full max-w-96 max-h-96 relative overflow-hidden rounded-md shrink-0">
            <Image
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              width={800}
              height={800}
              className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
            />
          </div>
          <div className="space-y-7">
            <div>{cocktail.strInstructions}</div>
            {coreIngridients && coreIngridients.length > 0 && (
              <div>
                <h3 className="font-semibold text-xl flex items-center space-x-1">
                  <TbComponents />
                  <span>Ingridients:</span>
                </h3>
                <ul className="list-none mt-2 pl-3">
                  {coreIngridients.map(item => {
                    return (
                      <li
                        key={`ingridient-${item.ingredient}-${item.measure}`}
                        className="before:content-['-'] before:mr-1 block font-medium space-x-1"
                      >
                        <span className="font-semibold">{item.ingredient}</span>
                        {item.measure && (
                          <span className="italic text-sm text-zinc-500">
                            ({item.measure})
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {cocktail.strGlass && (
              <h3 className="font-semibold text-xl flex items-center space-x-1">
                <TbGlassCocktail />
                <span>Glass:</span>
                <span className="text-base self-end italic text-zinc-500 font-normal">
                  {cocktail.strGlass}
                </span>
              </h3>
            )}
            {igridientsForGarnish && igridientsForGarnish.length > 0 && (
              <div>
                <h3 className="font-semibold text-xl flex items-center space-x-1">
                  <TbLemon />
                  <span>Garnish with:</span>
                </h3>
                <ul className="list-none mt-2 pl-3">
                  {igridientsForGarnish.map(item => {
                    return (
                      <li
                        key={`ingridient-${item.ingredient}-${item.measure}`}
                        className="before:content-['-'] before:mr-1 block font-medium space-x-1"
                      >
                        <span className="font-semibold">{item.ingredient}</span>
                        <span className="italic text-sm text-zinc-500">
                          ({item.measure})
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default CocktailPage
