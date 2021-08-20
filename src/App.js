import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './component/container';
import AppBar from './component/AppBar';
import LoaderComponent from './component/loader';

const HomePage = lazy(() =>
  import('./views/homePage' /* webpackChunkName: "HomePage"*/),
);
const MoviesPage = lazy(() =>
  import('./views/moviesPage' /* webpackChunkName: "MoviesPages"*/),
);
const MoviesDetailsPage = lazy(() =>
  import(
    './views/moviesDetailsPage' /* webpackChunkName: "MoviesDetailsPage"*/
  ),
);
const NotFoundView = lazy(() =>
  import('./views/notFoundView' /* webpackChunkName: "NotFoundView "*/),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MoviesDetailsPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
