import './App.css'
import { useState, useMemo } from 'react'
import { SortBy, type UUID, type User } from './types.d'
import UserList from './components/UserList'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (page: number) => {
  return await fetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=abraham`
  )
    .then(async res => {
      if (!res.ok) throw new Error('Error en la peticion')
      return await res.json()
    })
    .then(data => data.results)
}

function App() {
  const {
    isError,
    isLoading,
    data: results = [],
    refetch,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => await fetchUsers(1),
  })

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filteredCountry, setFilterCountry] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    await refetch()
  }

  const handleDelete = (id: UUID) => {
    // const newResults = [...results].filter(user => user.login.uuid !== id)
    // setResults(newResults)
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
      [SortBy.LAST]: user => user.name.last,
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
        {results.length > 0 && (
          <UserList
            users={sortedResults}
            isColored={showColors}
            deleteUser={handleDelete}
            changeSorting={handleChangeSort}
          />
        )}

        {isLoading && <strong>Cargando...</strong>}

        {isError && <p>Ha habido un error</p>}

        {!isLoading && results.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && (
          <button
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }}
          >
            Cargar mas resultados
          </button>
        )}
      </main>
    </>
  )
}

export default App
