import './App.css'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { ShowMovies } from './components/ShowMovies'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'
import {
  Page,
  Header,
  Title,
  Form,
  ErrorMessage,
  Content,
} from './components/Page'

function App() {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 450),
    [getMovies]
  )

  const handleSubmit = event => {
    event.preventDefault()
    // const { search } = Object.fromEntries(
    //   new window.FormData(event.target)
    // )
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = event => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <Page>
      <Header>
        <Title>Movie Search</Title>
        <Form onSubmit={handleSubmit}>
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
            autoComplete='off'
          />
          <label>
            <input type='checkbox' onChange={handleSort} checked={sort} />
            Sort by title
          </label>
          <button type='submit'>Search</button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Header>

      <Content>
        {loading ? <p>Loading...</p> : <ShowMovies movies={movies} />}
      </Content>
    </Page>
  )
}

export default App
