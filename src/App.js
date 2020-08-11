import React, { Component } from 'react';

import { register } from './utils/JWTAuth.js';
import Site from './utils/Site';
import SplashScreen from './components/Splash';

import './App.scss';

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1500);
  }

  async register() {
    let info = {
      nome: 'kaima',
      nivel: '1',
      login: 'kaima.abbes',
      senha: '123456789',
    };

    await register(info);
  }

  render() {
    return (
      <div className='container'>
        {this.state.loading ? <SplashScreen /> : <Site />}
      </div>
    );
  }
}

export default App;
