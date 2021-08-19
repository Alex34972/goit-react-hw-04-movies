import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from './component/container';
import AppBar from './component/AppBar';
import LoaderComponent from './component/loader';

const HomePage = lazy(() => import('./views/homePage'));
const MoviesPage = lazy(() => import('./views/moviesPage'));
const MoviesDetailsPage = lazy(() => import('./views/moviesDetailsPage'));
const NotFoundView = lazy(() => import('./views/notFoundView'));

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
          <Redirect to="/" exact />
        </Switch>
      </Suspense>
    </Container>
  );
}
