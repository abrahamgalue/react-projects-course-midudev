import { Movies, Movie, ReleaseDate, MovieImage, MovieTitle } from './Movies'

export function ListOfMovies({ movies }) {
  return (
    <Movies>
      {movies.map(movie => (
        <Movie key={movie.id}>
          <ReleaseDate>
            {movie.year} {movie.type}
          </ReleaseDate>
          <MovieImage src={movie.image} alt={movie.title} />
          <MovieTitle>{movie.title}</MovieTitle>
        </Movie>
      ))}
    </Movies>
  )
}

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export function ShowMovies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
