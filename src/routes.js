import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import NovoProtocolo from './pages/NovoProtocolo';
import Busca from './pages/Busca';
import Relatorio from './pages/Relatorio';
import Usuarios from './pages/Usuarios';
import NoMatchPage from './pages/NoMatchPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path='/' component={Home} />
      <PrivateRoute exact path='/home' component={Home} />
      <Route path='/login' component={Login} />
      <PrivateRoute exact path='/novoprotocolo' component={NovoProtocolo} />
      <PrivateRoute exact path='/busca' component={Busca} />
      <PrivateRoute exact path='/relatorio' component={Relatorio} />
      <PrivateRoute exact path='/usuarios' component={Usuarios} />
      <Route component={NoMatchPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;