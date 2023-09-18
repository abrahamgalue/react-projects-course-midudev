import './App.css'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 450),
    [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    // const { search } = Object.fromEntries(
    //   new window.FormData(event.target)
    // )
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'crimson' : 'transparent',
            }}
            onChange={handleChange}
            value={search}
            name='query'
            type='text'
            placeholder='The Godfather, Star Wars, The Matrix...'
          />
          <label>
            <input type='checkbox' onChange={handleSort} checked={sort} />
            Sort by title
          </label>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
