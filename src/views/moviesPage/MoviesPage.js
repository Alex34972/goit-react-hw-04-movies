import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoaderComponent from '../../component/loader';

import MoviesSearch from '../../component/moviesSearch';

import * as SearchMoviesAPI from '../../services/movies-api';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newSearch = new URLSearchParams(location.search).get('query');
    setQuery(newSearch);
  }, [location.search]);

  useEffect(() => {
    if (query === '') {
      return;
    }
    SearchMoviesAPI.fetchSearchMovies(query)
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
  }, [query]);

  const onSearchHandle = newSearch => {
    if (query === newSearch) return;
    setQuery(newSearch);
    setMovies([]);
    history.push({ ...location, search: `query=${newSearch}&page=1` });
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
