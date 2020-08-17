import React, { Component } from 'react';

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

  render() {
    return (
      <div className='container'>
        {this.state.loading ? <SplashScreen /> : <Site />}
      </div>
    );
  }
}

export default App;
