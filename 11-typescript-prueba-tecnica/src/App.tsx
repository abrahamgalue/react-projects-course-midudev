import './App.css'
import { useState, useEffect } from 'react'
import { type User } from './types'
import UserList from './components/UserList'

function App() {
  const [results, setResults] = useState<User[]>([])

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
        <button>Colorear filas</button>
      </header>
      <main>
        <UserList users={results} />
      </main>
    </>
  )
}

export default App
