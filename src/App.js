import React, { Component } from 'react';
import './App.css';

import { graphql, QueryRenderer } from 'react-relay';
import environment from './environment';

import Login from './containers/Login';

class App extends Component {
  render() {
    return <Login />;
  }
}

export default App;
