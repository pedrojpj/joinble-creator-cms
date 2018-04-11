import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import environment from '../environment';

import { Error } from '../containers';

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

      const vars =
        typeof variables === 'function' ? variables(this.props) : variables;

      return (
        <QueryRenderer
          environment={environment}
          query={rootQuery}
          variables={vars}
          render={({ error, props, retry }) => {
            if (!props && !error) {
              return null;
            }

            if (error) {
              return <Error code={error.code} error={error} {...this.props} />;
            }

            return (
              <BaseComponent
                {...props}
                {...this.props}
                error={error}
                retryQuery={retry}
              />
            );
          }}
        />
      );
    }
  };
