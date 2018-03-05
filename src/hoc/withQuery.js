import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../environment';

const invariant = () => {
  if (!environment) {
    throw new Error('Relay environment has not been declared.');
  }
};

export const withQuery = (rootQuery, variables) => BaseComponent =>
  class RelayRoot extends Component {
    static displayName = `RelayRoot(${BaseComponent.displayName})`;

    render() {
      invariant();

      const vars = typeof variables === 'function' ? variables(this.props) : variables;

      return (
        <QueryRenderer
          environment={environment}
          query={rootQuery}
          variables={vars}
          render={({ error, props }) => {
            if (!props && !error) {
              return null;
            }

            return <BaseComponent {...props} {...this.props} error={error} />;
          }}
        />
      );
    }
  };
