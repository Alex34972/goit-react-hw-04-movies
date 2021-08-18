import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoaderComponent from '../../component/loader';

import MoviesSearch from '../../component/moviesSearch';

import * as SearchMoviesAPI from '../../services/movies-api';

export default function MoviesPage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }
    SearchMoviesAPI.fetchSearchMovies(search)
      .then(response => {
        const fetchedMovies = response.results.map(movie => {
          return {
            movieId: movie.id,
            movieName: movie.title ?? movie.name,
          };
        });

        setMovies(prevState => [...prevState, ...fetchedMovies]);
      })
      .finally(() => setIsLoading(false));
  }, [search]);

  const onSearchHandle = query => {
    setSearch(query);
    setMovies([]);
  };

  return (
    <>
      <MoviesSearch onSearch={onSearchHandle} />
      {isLoading && <LoaderComponent />}
      {movies &&
        movies.map(({ movieId, movieName }) => (
          <li key={movieId}>
            <Link
              to={{
                pathname: `/movies/${movieId}`,
                state: { from: location },
              }}
            >
              {movieName}
            </Link>
          </li>
        ))}
    </>
  );
}
