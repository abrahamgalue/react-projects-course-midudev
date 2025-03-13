import { createContext, useState } from 'react'

// Singleton => Module de JavaScript

// 1. Create the context
// This is the one we have to consume
export const FiltersContext = createContext() // solo se crea una vez

// 2. Create the provider, to provide the context
// This is the one that provides us with access to the context
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 10,
  })

  return (
    <FiltersContext
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext>
  )
}

// FILTRAR ES MUY TÍPICO Y ES DE JUNIORS Y TRAINE
// const [filters, setFilters] = useState({
//   category: 'all',
//   minPrice: 0,
// })
