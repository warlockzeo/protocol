import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
//import jwt from 'jwt-decode';
const SERVER_URL = 'http://localhost/atuais/react/protocolo.v2.api';

const register = async (data) => {
  const SIGNUP_ENDPOINT = `${SERVER_URL}/api/register.php`;
  try {
    let response = await axios({
      method: 'post',
      responseType: 'json',
      url: SIGNUP_ENDPOINT,
      data: JSON.stringify(data),
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const login = async (data) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/api/login.php`;
  try {
    let response = await axios({
      method: 'post',
      responseType: 'json',
      url: LOGIN_ENDPOINT,
      data: JSON.stringify(data),
    });

    console.log(response.data);
    if (
      response.status === 200 &&
      response.data.jwt &&
      response.data.expireAt
    ) {
      let tokenJwt = response.data.jwt;
      let expire_at = response.data.expireAt;

      localStorage.setItem('access_token', tokenJwt);
      localStorage.setItem('expire_at', expire_at); //dias para expirar
      console.log('Loged In');

      window.location.href = '/home/';
      return <Redirect to={{ pathname: '/home' }} />;
    }
  } catch (e) {
    return { message: 'Usuario ou senha inválidos' };
  }
};

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expire_at');
  console.log('Loged Out');
  window.location.href = '/login';
  return <Redirect to={{ pathname: '/login' }} />;
};

const userAuth = localStorage.getItem('access_token');

const isAuthenticated = () => !!userAuth;

export { login, register, logout, isAuthenticated, userAuth };
