import { compose, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';
import { withQuery, withMutation } from '../../hoc';

import Login from '../../components/Login';

export default compose(
  withQuery(graphql`
    query LoginQuery {
      translations
    }
  `),
  withForm(
    {
      email: {
        value: '',
        required: true
      },
      password: {
        value: '',
        required: true
      }
    },
    ({ history }) => form => {
      withMutation(
        graphql`
          mutation LoginMutation($login: LoginInput!) {
            login(login: $login) {
              user {
                id
                name
                email
                city
                country
                address
              }
              token {
                token
                lastLogin
              }
            }
          }
        `,
        { login: form }
      ).then(({ login }) => {
        if (login.token) {
          localStorage.setItem('AUTH_TOKEN', login.token.token);
          history.push('/home');
        }
      });
    }
  ),
  pure
)(Login);
