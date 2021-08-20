import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import s from './MoviesDetailsPage.module.css';
import * as MovieAPI from '../../services/movies-api';
import MoviesCard from '../../component/moviesCard';
import PageHeading from '../../component/pageHeading';
import LoaderComponent from '../../component/loader';

const Cast = lazy(() =>
  import('../moviesDetailsPage/cast/cast' /* webpackChunkName: "Cast"*/),
);
const Reviews = lazy(() =>
  import(
    '../moviesDetailsPage/reviews/Reviews' /* webpackChunkName: "Reviews"*/
  ),
);

export default function MoviesDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    MovieAPI.fetchMovie(movieId)
      .then(response => {
        const myMovie = {
          img: response.poster_path,
          name: response.title ?? response.name,
          score: response.vote_average,
          overview: response.overview,
          genres: response.genres,
        };
        return setMovies(myMovie);
      })
      .finally(() => setIsLoading(false));
  }, [movieId]);

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <PageHeading text="Movie" />
      <button onClick={goBack} type="button" className={s.information__button}>
        &#171; Go Back
      </button>
      {isLoading && <LoaderComponent />}
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
      <Suspense fallback={<LoaderComponent />}>
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
