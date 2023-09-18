// import { useCart } from '../hooks/useCart.js'
// import { useFilters } from '../hooks/useFilters.js'
import './Footer.css'

export function Footer() {
  // const { filters } = useFilters()
  // const { cart } = useCart()

  return (
    <footer className='footer'>
      {/* {JSON.stringify(cart, null, 2)} */}
      <h4>
        Prueba técnica de React ⚛️ -<span>@abrahamgalue</span>
      </h4>
      <h5>Shopping Cart with useContext & useReducer</h5>
    </footer>
  )
}
