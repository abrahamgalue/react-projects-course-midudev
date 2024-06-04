import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import {
  StyledProducts,
  ProductInfo,
  ProductFooter,
  ProductPrice,
} from './Products.styled'
import { useScreenSize } from '../hooks/useScreenSize'

export function Products({ products }) {
  const { size, SCREEN_BREAK_POINT } = useScreenSize()
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <StyledProducts>
      <ul>
        {products.slice(0, 20).map(product => {
          const isProductInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <ProductInfo>
                <p>
                  {size >= SCREEN_BREAK_POINT
                    ? product.title
                    : product.title.slice(0, 15) + '...'}
                </p>
                <strong>{product.brand}</strong>
              </ProductInfo>
              <ProductFooter>
                <button
                  style={{ color: isProductInCart ? 'crimson' : 'green' }}
                  onClick={() =>
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
                <ProductPrice>${product.price}</ProductPrice>
              </ProductFooter>
            </li>
          )
        })}
      </ul>
    </StyledProducts>
  )
}
