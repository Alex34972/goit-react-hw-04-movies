import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as MoviesTrendingAPI from '../../services/movies-api';
import PageHeading from '../../component/pageHeading';

export default function HomePage() {
  const { url } = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MoviesTrendingAPI.fetchMoviesTrending().then(response => {
      const fetchedMovies = response.results.map(movie => {
        return {
          movieId: movie.id,
          movieName: movie.title ?? movie.name,
        };
      });

      setMovies(prevState => [...prevState, ...fetchedMovies]);
    });
  }, []);

  return (
    <div>
      <PageHeading />
      <ul>
        {movies.map(({ movieId, movieName }) => (
          <li key={movieId}>
            <Link
              to={{
                pathname: `/movies/${movieId}`,
                state: { from: url },
              }}
            >
              {movieName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
