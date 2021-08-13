import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './component/container';
import AppBar from './component/AppBar';
import HomePage from './views/home';
import MoviesPage from './views/moviesPage';

export default function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
      </Switch>
    </Container>
  );
}
