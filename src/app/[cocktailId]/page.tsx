'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { getCocktailById, getIngredients } from '@/lib/cocktails'

const CocktailPage = ({ params }: { params: { cocktailId: string } }) => {
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
  console.log('cocktail:', cocktail)
  return cocktail ? (
    <div>
      <h1 className="text-5xl text-center font-semibold">
        {cocktail.strDrink}
      </h1>
      <div className="container mt-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-96 h-96 relative overflow-hidden rounded-md shrink-0">
            <Image
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              width={800}
              height={800}
              className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
            />
          </div>
          <div className="space-y-6">
            <div>{cocktail.strInstructions}</div>
            {coreIngridients && coreIngridients.length > 0 && (
              <div>
                <h3 className="font-semibold text-xl">Ingridients:</h3>
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
            {igridientsForGarnish && igridientsForGarnish.length > 0 && (
              <div>
                <h3 className="font-semibold text-xl">Garnish with:</h3>
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
      {/* <div className="border border-border rounded-md p-3 flex gap-4">
        <div className="relative w-40 h-48 shrink-0 rounded-md overflow-hidden group">
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            className="object-cover group-hover:rotate-6 group-hover:scale-125 duration-300"
          />
        </div>
        <div className="overflow-hidden grow">
          <div className="overflow-hidden flex justify-between w-full">
            <div className="font-semibold text-2xl block overflow-hidden hover:underline duration-150">
              <h3 className="truncate">{cocktail.strDrink}</h3>
            </div>
            <div className="shrink-0">
              <Heart className="hover:text-red-500 cursor-pointer duration-150" />
            </div>
          </div>
          {ingredientMeasures && ingredientMeasures.length > 0 && (
            <ul className="list-none mt-3 text-zinc-600">
              {ingredientMeasures.map(item => {
                return (
                  <li key={`ingridient-${item.ingredient}`}>
                    - {item.ingredient}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div> */}
    </div>
  ) : null
}

export default CocktailPage
