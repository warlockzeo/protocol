import React from 'react';
import { Redirect } from 'react-router-dom';

export const Logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/';
  return <Redirect to={{ pathname: '/' }} />;
};

export const Login = data => {
  const { login } = data;
  localStorage.setItem('user', { login, status: 'active' });
  window.location.href = '/dashboard/';
  return <Redirect to={{ pathname: '/dashboard' }} />;
};

export const userAuth = localStorage.getItem('user');

const isAuthenticated = () => !!userAuth;

export default isAuthenticated;
