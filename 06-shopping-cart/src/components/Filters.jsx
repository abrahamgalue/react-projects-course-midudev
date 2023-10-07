import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'
import { products } from '../mocks/products'
import {
  FilterSection,
  Div,
  Label,
  Span,
  Select,
  Option,
} from './Filters.styled'

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
    <FilterSection>
      <Div>
        <Label htmlFor={minPriceFilterId}>Price starting from:</Label>
        <input
          id={minPriceFilterId}
          type='range'
          min='0'
          max='1749'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <Span>${filters.minPrice}</Span>
      </Div>

      <Div>
        <label htmlFor={categoryFilterId}>Category</label>
        <Select
          id={categoryFilterId}
          onChange={handleChangeCategory}
          value={filters.category}
        >
          <Option value='all'>All</Option>
          {categories.map(category => (
            <Option key={category} value={category}>
              {category.replace(/-/g, ' ')}
            </Option>
          ))}
        </Select>
      </Div>
    </FilterSection>
  )
}
