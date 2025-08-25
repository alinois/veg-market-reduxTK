import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import articlesReducer from './articlesSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    articles: articlesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
