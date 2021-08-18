import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MoviesSearch from '../../component/moviesSearch';

import * as SearchMoviesAPI from '../../services/movies-api';

const MoviesPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }
    SearchMoviesAPI.fetchSearchMovies(search).then(response => {
      const fetchedMovies = response.results.map(movie => {
        return {
          movieId: movie.id,
          movieName: movie.title ?? movie.name,
        };
      });

      setMovies(prevState => [...prevState, ...fetchedMovies]);
    });
  }, [search]);

  const onSearchHandle = query => {
    setSearch(query);
    setMovies([]);
  };

  return (
    <>
      <MoviesSearch onSearch={onSearchHandle} />
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
};

export default MoviesPage;
