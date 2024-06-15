import './App.css'
import { useState, useEffect } from 'react'
import { type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [colors, setColors] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(data => {
        setResults(data.results)
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }, [])

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
      </header>
      <main>
        <UserList isColored={colors} users={newResults} />
      </main>
    </>
  )
}

export default App