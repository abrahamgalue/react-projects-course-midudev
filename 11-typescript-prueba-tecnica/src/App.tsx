import './App.css'
import { useState, useEffect, useRef, useMemo } from 'react'
import { type UUID, type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [colors, setColors] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [filteredCountry, setFilterCountry] = useState<string | null>(null)
  const initialState = useRef<User[]>([])

  const toggleColors = () => {
    console.log('colores')
    setColors(!colors)
  }

  const toggleSortByCountry = () => {
    console.log('ordenar por país')
    setIsOrdered(!isOrdered)
  }

  const handleReset = () => {
    console.log('resetear estado')
    setResults(initialState.current)
  }

  const toggleDelete = (id: UUID) => {
    console.log('borrar usuario')
    const newResults = [...results].filter(user => user.login.uuid !== id)

    setResults(newResults)
  }

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

  const filteredUsers = useMemo(() => {
    console.log('filtrar por input')

    return filteredCountry !== null && filteredCountry.length > 0
      ? [...results].filter(user =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filteredCountry.toLocaleLowerCase())
        )
      : results
  }, [results, filteredCountry])

  const sortedResults = useMemo(() => {
    return isOrdered
      ? [...results].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers
  }, [filteredUsers])

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
        {sortedResults.length !== 0 && (
          <UserList
            users={sortedResults}
            isColored={colors}
            toggleDelete={toggleDelete}
          />
        )}
      </main>
    </>
  )
}

export default App
