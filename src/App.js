import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Container from './component/container';
import AppBar from './component/AppBar';

const HomePage = lazy(() => import('./views/homePage/HomePage'));
const MoviesPage = lazy(() => import('./views/moviesPage/MoviesPage'));
const MoviesDetailsPage = lazy(() =>
  import('./views/moviesDetailsPage/MoviesDetailsPage'),
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h3>Loading</h3>}>
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
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
}
