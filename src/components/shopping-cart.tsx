'use client'

import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice'

export default function ShoppingCart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  const handleAddItem = () => {
    dispatch(
      addItem({ id: Date.now(), name: 'New Product', price: 9.99, quantity: 1 })
    )
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id))
  }

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)} x
            <input
              type="number"
              value={item.quantity}
              onChange={e =>
                handleUpdateQuantity(item.id, parseInt(e.target.value))
              }
              min="1"
            />
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.total.toFixed(2)}</p>
      <button onClick={handleAddItem}>Add Item</button>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  )
}
