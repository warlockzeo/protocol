import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Site from './utils/Site';
import './App.scss';
const SIGNUP_ENDPOINT = `${process.env.REACT_APP_URLBASEAPI}/users`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'get',
          responseType: 'json',
          url: SIGNUP_ENDPOINT,
        });

        dispatch({
          type: 'List',
          data: response.data,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch]);

  return (
    <div className='container'>
      <Site />
    </div>
  );
};

export default App;
