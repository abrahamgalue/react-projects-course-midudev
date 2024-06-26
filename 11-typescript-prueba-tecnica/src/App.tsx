import './App.css'
import { useState, useEffect, useRef, useMemo } from 'react'
import { SortBy, type UUID, type User } from './types.d'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filteredCountry, setFilterCountry] = useState<string | null>(null)

  const initialState = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => {
        setResults(data.results)
        initialState.current = data.results
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }, [])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setResults(initialState.current)
  }

  const handleDelete = (id: UUID) => {
    const newResults = [...results].filter(user => user.login.uuid !== id)

    setResults(newResults)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredResults = useMemo(() => {
    return filteredCountry !== null && filteredCountry.length > 0
      ? [...results].filter(user =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filteredCountry.toLocaleLowerCase())
        )
      : results
  }, [results, filteredCountry])

  const sortedResults = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredResults

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredResults.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredResults, sorting])

  return (
    <>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>Ordenar por país</button>
        <button onClick={handleReset}>Resetear estado</button>
        <input
          type='text'
          placeholder='Filtra por país'
          onChange={e => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        <UserList
          users={sortedResults}
          isColored={showColors}
          deleteUser={handleDelete}
          changeSorting={handleChangeSort}
        />
      </main>
    </>
  )
}

export default App
