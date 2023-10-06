import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([

    {
      title: 'Star Wars: Episode IV - A New Hope',
      year: '1977',
      imdbid: 'tt0076759',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode V - The Empire Strikes Back',
      year: '1980',
      imdbid: 'tt0080684',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode VI - Return of the Jedi',
      year: '1983',
      imdbid: 'tt0086190',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode VII - The Force Awakens',
      year: '2015',
      imdbid: 'tt2488496',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode I - The Phantom Menace',
      year: '1999',
      imdbid: 'tt0120915',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode III - Revenge of the Sith',
      year: '2005',
      imdbid: 'tt0121766',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode II - Attack of the Clones',
      year: '2002',
      imdbid: 'tt0121765',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
    },
    {
      title: 'Rogue One: A Star Wars Story',
      year: '2016',
      imdbid: 'tt3748528',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode VIII - The Last Jedi',
      year: '2017',
      imdbid: 'tt2527336',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
    },
    {
      title: 'Star Wars: Episode IX - The Rise of Skywalker',
      year: '2019',
      imdbid: 'tt2527338',
      type: 'movie',
      image:
        'https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg',
    }

  ])
  const [loading, setLoading] = useState(false)
  // el error no se usa pero se puede implementar
  // si se quiere:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return (movies !== null && sort !== false)
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
