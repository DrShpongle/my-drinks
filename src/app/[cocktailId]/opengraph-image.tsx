import { ImageResponse } from 'next/og'
import { getCocktailById } from '@/lib/cocktails'

export const runtime = 'edge'

export const alt = 'Cocktail Image'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: { cocktailId: string }
}) {
  const cocktail = await getCocktailById(params.cocktailId)

  if (!cocktail) {
    return new ImageResponse(<div>Cocktail not found</div>)
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <img
          src={cocktail.drinks[0].strDrinkThumb}
          alt={cocktail.drinks[0].strDrink}
          width={400}
          height={400}
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
        <h1 style={{ fontSize: 60, fontWeight: 'bold', marginTop: 40 }}>
          {cocktail.drinks[0].strDrink}
        </h1>
      </div>
    ),
    {
      ...size,
    }
  )
}
