import './App.css'
import { useState, useEffect } from 'react'
import { type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])
  const [colors, setColors] = useState(false)

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
      </header>
      <main>
        <UserList isColored={colors} users={results} />
      </main>
    </>
  )
}

export default App
