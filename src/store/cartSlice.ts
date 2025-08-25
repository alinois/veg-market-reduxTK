import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, Article } from '../types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: Article; quantity: number }>) => {
      const { item, quantity } = action.payload
      const existing = state.items.find(el => el.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ ...item, quantity })
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter(el => el.id !== id)
      } else {
        const existing = state.items.find(el => el.id === id)
        if (existing) existing.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  },
})

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
