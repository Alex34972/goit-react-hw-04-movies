import { useState, useEffect } from 'react';

import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import * as MovieAPI from '../../services/movies-api';
import MoviesCard from '../../component/moviesCard';
import PageHeading from '../../component/pageHeading';

export default function MoviesDetailsPage() {
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovies] = useState();

  useEffect(() => {
    MovieAPI.fetchMovie(movieId).then(response => {
      const myMovie = {
        img: response.poster_path,
        name: response.title ?? response.name,
        score: response.vote_average,
        overview: response.overview,
        genres: response.genres,
      };
      return setMovies(myMovie);
    });
  }, [movieId]);

  return (
    <>
      <PageHeading text="Movie" />
      <button type="button" className="go-back-button">
        Go Back
      </button>
      {movie && <MoviesCard movie={movie} />}
      <div className="information-container">
        <h3 className="information-title">Additional information</h3>
        <nav>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
            className="information-link"
          >
            Cast
          </NavLink>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from },
            }}
            className="information-link"
          >
            Reviews
          </NavLink>
        </nav>
      </div>

      <Switch>
        <Route path={`${path}/cast`} exact></Route>

        <Route path={`${path}/reviews`} exact></Route>
      </Switch>
    </>
  );
}
