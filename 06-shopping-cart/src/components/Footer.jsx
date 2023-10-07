// import { useCart } from '../hooks/useCart.js'
// import { useFilters } from '../hooks/useFilters.js'
import { StyledFooter } from './Footer.styled'

export function Footer() {
  // const { filters } = useFilters()
  // const { cart } = useCart()

  return (
    <StyledFooter>
      {/* {JSON.stringify(cart, null, 2)} */}
      <h4>
        Prueba técnica de React ⚛️ -<span>@abrahamgalue</span>
      </h4>
      <h5>Shopping Cart with useContext & useReducer</h5>
    </StyledFooter>
  )
}
