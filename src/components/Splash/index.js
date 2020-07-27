import React from 'react';
import Loader from '../Loader';

import './styles.css';

const SplashScreen = () => {
  return (
    <div className='splashScreen'>
      <img
        src='/assets/images/logo-pmtn.jpg'
        alt='Protocolo Central'
        className='logo'
      />

      <Loader />
    </div>
  );
};

export default SplashScreen;
