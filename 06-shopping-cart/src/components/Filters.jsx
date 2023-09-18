import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'
import { products } from '../mocks/products'
import './Filters.css'

export function Filters() {
  const categories = Array.from(
    new Set(products.map(product => product.category))
  )

  const { filters, setFilters } = useFilters()

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = event => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value,
    }))
  }

  const handleChangeCategory = event => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Price starting from:</label>
        <input
          id={minPriceFilterId}
          type='range'
          min='0'
          max='1749'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select
          id={categoryFilterId}
          onChange={handleChangeCategory}
          value={filters.category}
        >
          <option value='all'>All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace(/-/g, ' ')}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
