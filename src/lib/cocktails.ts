export const getCocktailsByName = async (cocktail: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}?s=${cocktail}`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch drinks...')
  }
  const data = await response.json()
  return data
}
