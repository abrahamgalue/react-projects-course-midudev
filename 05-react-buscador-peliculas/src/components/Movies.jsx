export function ListOfMovies({ movies }) {
  return (
    <ul className='movies' key={movies}>
      {movies.map(movie => (
        <li className='movie' key={movie.id}>
          <p style={{ textTransform: 'capitalize' }}>
            {movie.year} {movie.type}
          </p>
          <img src={movie.image} alt={movie.title} />
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  )
}

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
