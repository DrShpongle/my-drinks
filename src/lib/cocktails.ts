export interface Cocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  [key: string]: string | null
}

export interface IngredientMeasure {
  ingredient: string
  measure: string | null
}

export const getIngredients = (cocktail: Cocktail): IngredientMeasure[] => {
  const ingredients: IngredientMeasure[] = []

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Cocktail
    const measureKey = `strMeasure${i}` as keyof Cocktail

    const ingredient = cocktail[ingredientKey]
    const measure = cocktail[measureKey]

    if (ingredient) {
      ingredients.push({
        ingredient: ingredient,
        measure: measure,
      })
    } else {
      break
    }
  }

  return ingredients
}

export const getCocktailsByName = async (cocktail: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search.php?s=${cocktail}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch cocktails...')
  }
  const data = await response.json()
  return data
}

export const getCocktailById = async (cocktailId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lookup.php?i=${cocktailId}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch cocktail...')
  }
  const data = await response.json()
  return data
}
