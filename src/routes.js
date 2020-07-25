import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path='/home' component={Home} />
      <Route path='/login' component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
