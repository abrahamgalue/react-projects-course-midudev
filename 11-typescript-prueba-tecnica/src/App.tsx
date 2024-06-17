import './App.css'
import { useState, useEffect, useRef } from 'react'
import { type UUID, type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [colors, setColors] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
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

  const toggleDelete = (id: UUID) => {
    const newResults = [...results].filter(user => user.login.uuid !== id)

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
        <button
          onClick={() => {
            setColors(!colors)
          }}
        >
          Colorear filas
        </button>
        <button
          onClick={() => {
            setIsOrdered(!isOrdered)
          }}
        >
          Ordenar por país
        </button>
        <button
          onClick={() => {
            setResults(initialState.current)
          }}
        >
          Resetear estado
        </button>
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
