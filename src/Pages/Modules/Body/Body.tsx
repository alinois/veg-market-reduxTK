import { useEffect } from 'react'
import { Cards } from '../Components/Card/Cards'
import { Popup } from '../Components/Popup/Popup'
import './Body.scss'
import { useSelector, useDispatch } from 'react-redux'
import { loadArticles } from '../../../store/articlesSlice'
import { addToCart, updateQuantity } from '../../../store/cartSlice'
import type { RootState, AppDispatch } from '../../../store/store'

interface BodyProps {
  isPopupOpen: boolean
}

export const Body: React.FC<BodyProps> = ({ isPopupOpen }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: articles, loading } = useSelector((state: RootState) => state.articles)
  const cartItems = useSelector((state: RootState) => state.cart.items)

  useEffect(() => {
    dispatch(loadArticles())
  }, [dispatch])

  return (
    <>
      <Popup
        articles={cartItems}
        isOpen={isPopupOpen}
        onUpdateQuantity={(id, q) => dispatch(updateQuantity({ id, quantity: q }))}
      />
      <div className="container">
        <h2>Catalog</h2>
        <div className="articles-container">
          <Cards
            articles={articles}
            onAddToCart={(item, q) => dispatch(addToCart({ item, quantity: q }))}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  )
}
