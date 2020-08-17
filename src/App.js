import React from 'react';
import Site from './utils/Site';
import './App.scss';

const App = () => {
  document.getElementById('loading').remove();
  return (
    <div className='container'>
      <Site />
    </div>
  );
};

export default App;
