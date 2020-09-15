import React from 'react';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
  sessionStorage.removeItem('user');
  window.location.href = '/';
  return <Redirect to={{ pathname: '/' }} />;
};

export const Login = (data) => {
  const { login } = data;
  sessionStorage.setItem('user', { login, status: 'active' });
  window.location.href = '/dashboard/';
  return <Redirect to={{ pathname: '/dashboard' }} />;
};

export const userAuth = sessionStorage.getItem('user');

const isAuthenticated = () => !!userAuth;

export default isAuthenticated;
