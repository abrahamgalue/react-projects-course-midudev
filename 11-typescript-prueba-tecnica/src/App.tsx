import './App.css'
import { useState, useEffect, useRef } from 'react'
import { type UUID, type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [colors, setColors] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const initialState = useRef<User[]>([])

  const toggleColors = () => {
    setColors(!colors)
  }

  const toggleSortByCountry = () => {
    setIsOrdered(!isOrdered)
  }

  const handleReset = () => {
    setResults(initialState.current)
  }

  const toggleDelete = (id: UUID) => {
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

  const toggleFilter = (country: string) => {
    if (country === '') {
      setResults(initialState.current)
      return
    }

    const newResults = [...results].filter(user =>
      user.location.country
        .toLocaleLowerCase()
        .includes(country.toLocaleLowerCase())
    )

    setResults(newResults)
  }

  const newResults = isOrdered
    ? [...results].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : results

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
            toggleFilter(e.target.value)
          }}
        />
      </header>
      <main>
        {newResults.length !== 0 && (
          <UserList
            users={newResults}
            isColored={colors}
            toggleDelete={toggleDelete}
          />
        )}
      </main>
    </>
  )
}

export default App
