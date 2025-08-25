import { useState } from 'react'
import { Header } from './Modules/Header/Header'
import { Body } from './Modules/Body/Body'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

export const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Header onCartClick={() => setIsPopupOpen(p => !p)} totalItems={totalItems} />
      <Body isPopupOpen={isPopupOpen} />
    </>
  )
}

export default App
