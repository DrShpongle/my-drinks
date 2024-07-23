import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

const initialState: CartState = {
  items: [],
  total: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total += action.payload.price
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload)
      if (existingItem) {
        state.total -= existingItem.price * existingItem.quantity
        state.items = state.items.filter(item => item.id !== action.payload)
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )
      if (existingItem) {
        state.total +=
          (action.payload.quantity - existingItem.quantity) * existingItem.price
        existingItem.quantity = action.payload.quantity
      }
    },
    clearCart: state => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions
export default cartSlice.reducer
