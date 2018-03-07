import React, { Component } from 'react';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../environment';

const invariant = () => {
  if (!environment) {
    throw new Error('Relay environment has not been declared.');
  }
};

class RedirectLogin extends Component {
  componentDidMount() {
    this.props.router.push('/auth/login');
  }
  render() {
    return null;
  }
}

export const withAuth = () => BaseComponent =>
  class RelayRoot extends Component {
    static displayName = `RelayRoot(${BaseComponent.displayName})`;

    render() {
      invariant();

      return (
        <QueryRenderer
          environment={environment}
          query={graphql`
            query withAuthQuery {
              checkUser {
                status
              }
            }
          `}
          render={({ error, props }) => {
            if (props && props.checkUser.status) {
              return <BaseComponent {...props} {...this.props} error={error} />;
            } else if (props && !props.checkUser.status) {
              return <RedirectLogin {...this.props} />;
            } else {
              return null;
            }
          }}
        />
      );
    }
  };
