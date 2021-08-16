import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import s from './MoviesDetailsPage.module.css';
import * as MovieAPI from '../../services/movies-api';
import MoviesCard from '../../component/moviesCard';
import PageHeading from '../../component/pageHeading';
import Button from '../../component/buttons/';
const Cast = lazy(() => import('../moviesDetailsPage/cast/cast'));
const Reviews = lazy(() => import('../moviesDetailsPage/reviews/Reviews'));

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
      <Button text="Go Back" />
      {movie && <MoviesCard movie={movie} />}
      <div className={s.information__container}>
        <h3 className={s.information__title}>Additional information</h3>
        <nav>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
            className={s.information__link}
          >
            Cast
          </NavLink>

          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from },
            }}
            className={s.information__link}
          >
            Reviews
          </NavLink>
        </nav>
      </div>
      <Suspense fallback={<h3>Loading</h3>}>
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast />
          </Route>

          <Route path={`${path}/reviews`} exact>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
