import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Pokemon } from './pages/pokemon';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/pokemon/:id' component={Pokemon} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
