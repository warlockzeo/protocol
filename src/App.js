import React, { Component } from 'react';

import { login, register } from './utils/JWTAuth.js';
//import Routes from './routes';
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

  async login() {
    let info = {
      login: 'kaima.abbes',
      senha: '123456789',
    };

    await login(info);
  }

  render() {
    // const CodeTest = () => (
    //   <div className='row'>
    //     <h1>React JWT Authentication Example</h1>

    //     <button className='btn btn-primary' onClick={this.register}>
    //       Sign up
    //     </button>

    //     <button className='btn btn-primary' onClick={this.login}>
    //       Log in
    //     </button>
    //   </div>
    // );

    return (
      <div className='container'>
        {this.state.loading ? <SplashScreen /> : <Site />}
      </div>
    );
  }
}

export default App;
