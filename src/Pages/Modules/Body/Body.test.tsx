import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Body } from './Body'
import articlesReducer from '../../../store/articlesSlice'
import cartReducer from '../../../store/cartSlice'
import type { BodyProps, CartItem } from '../../../types'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'

describe('Body', () => {
  const mockCartItems: CartItem[] = [
    { id: '1', name: 'Tomato-1kg', price: 2, image: 'img1.jpg', quantity: 1 },
  ]

  const props: BodyProps = {
    isPopupOpen: false,
    cartItems: mockCartItems,
    onAddToCart: vi.fn(),
    onUpdateQuantity: vi.fn(),
  }

  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      cart: cartReducer,
    },
    preloadedState: {
      articles: { data: [], loading: false, error: null },
      cart: { items: mockCartItems },
    },
  })

  it('renders catalog title', () => {
    render(
      <Provider store={store}>
        <Body {...props} />
      </Provider>
    )
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument()
  })
})
