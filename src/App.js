import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './component/container';
import AppBar from './component/AppBar';
import HomePage from './views/home';
import MoviesDetailsPage from './views/moviesDetailsPage';

export default function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies/:movieId">
          <MoviesDetailsPage />
        </Route>
      </Switch>
    </Container>
  );
}
