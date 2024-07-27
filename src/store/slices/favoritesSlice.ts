import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteItem {
  id: string
  name: string
  thumb: string
}

export interface FavoritesState {
  items: FavoriteItem[]
  total: number
}

const initialState: FavoritesState = {
  items: [],
  total: 0,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      )
      if (!existingItem) {
        state.items.push({ ...action.payload })
      }
      state.total += 1
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(item => item.id === action.payload)
      if (existingItem) {
        state.total -= 1
        state.items = state.items.filter(item => item.id !== action.payload)
      }
    },
    clearFavorites: state => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions
export default favoritesSlice.reducer
