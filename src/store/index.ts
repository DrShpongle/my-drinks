// store/index.ts

import { configureStore, Middleware } from '@reduxjs/toolkit'
import favoritesReducer, { FavoritesState } from './slices/favoritesSlice'
import { loadState, saveState } from '@/hooks/useLocalStorage'

const REDUX_STATE_KEY = 'reduxState'

export interface RootState {
  favorites: FavoritesState
}

const localStorageMiddleware: Middleware<{}, RootState> =
  store => next => action => {
    const result = next(action)
    saveState(REDUX_STATE_KEY, store.getState())
    return result
  }

const preloadedState = loadState<RootState>(REDUX_STATE_KEY, {
  favorites: {
    items: [],
  },
})

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type AppDispatch = typeof store.dispatch
