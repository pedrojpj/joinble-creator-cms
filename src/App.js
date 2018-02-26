import React, { Component } from 'react';
import './App.css';

import { graphql, QueryRenderer } from 'react-relay';
import environment from './environment';

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            translations
          }
        `}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>{props.translations}</div>;
        }}
      />
    );
  }
}

export default App;
