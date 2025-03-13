import { use } from 'react'
import { CartContext } from '../context/cart.jsx'

export const useCart = () => {
  const context = use(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}