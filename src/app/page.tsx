import ShoppingCart from '@/components/shopping-cart'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Drinks</h1>
      <ShoppingCart />
    </main>
  )
}
