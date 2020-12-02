import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/JWTAuth';

import jwt from 'jwt-decode';

const tokenJwt = sessionStorage.getItem('access_token');
const user = tokenJwt && jwt(tokenJwt).data;
const userLevel = user?.nivel;

const PrivateRoute = ({ component: Component, level, ...rest }) => {
  //console.log(userLevel, level);
  const levelOK = !level || userLevel >= level ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          levelOK ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
