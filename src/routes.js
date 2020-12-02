import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import NovoProtocolo from './pages/NovoProtocolo';
import Busca from './pages/Busca';
import Relatorio from './pages/Relatorio';
import Usuarios from './pages/Usuarios';
import NoMatchPage from './pages/NoMatchPage';

const Routes = () => (
  <Switch>
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute exact path='/home' component={Home} />
    <Route path='/login' component={Login} />
    <PrivateRoute exact path='/novoprotocolo' component={NovoProtocolo} />
    <PrivateRoute exact path='/busca/:protocol' component={Busca} />
    <PrivateRoute exact path='/busca/' component={Busca} />
    <PrivateRoute exact path='/relatorio' component={Relatorio} level='10' />
    <PrivateRoute exact path='/usuarios' component={Usuarios} level='10' />
    <PrivateRoute exact path='/encaminhamento/:reg' component={NovoProtocolo} />
    <PrivateRoute exact path='/editar/:reg' component={NovoProtocolo} />
    <Route component={NoMatchPage} />
  </Switch>
);

export default Routes;
