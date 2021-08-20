import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as MoviesTrendingAPI from '../../services/movies-api';
import PageHeading from '../../component/pageHeading';
import LoaderComponent from '../../component/loader';
import ErrorComponent from '../../component/error';
export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    MoviesTrendingAPI.fetchMoviesTrending()
      .then(response => {
        const fetchedMovies = response.results.map(movie => {
          return {
            movieId: movie.id,
            movieName: movie.title ?? movie.name,
          };
        });
        setMovies(prevState => [...prevState, ...fetchedMovies]);
      })
      .catch(() => {
        setError('The resource you requested could not be found.');
      })
      .finally(() => setIsLoading(false));
  }, [error]);

  return (
    <div>
      <PageHeading text="Trending Today" />
      {error && <ErrorComponent message={error.message} />}
      {isLoading && <LoaderComponent />}
      <ul>
        {movies.map(({ movieId, movieName }) => (
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
      </ul>
    </div>
  );
}
