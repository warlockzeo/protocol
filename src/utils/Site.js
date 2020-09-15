import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from '../components/Header';
import Routes from '../routes';

const Site = () => (
  <BrowserRouter>
    <div className='App'>
      {sessionStorage.getItem('access_token') && <Header />}
      <Routes />
    </div>
  </BrowserRouter>
);

export default Site;
