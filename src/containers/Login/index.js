import { compose, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withMutation, withAnimation } from '../../hoc';
import Login from '../../components/Login';

export default compose(
  withAnimation({
    opacity: [0, 1],
    delay: 200,
    translateY: '10em',
    elasticity: function(el, i, l) {
      return 200 + i * 200;
    }
  }),
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
    ({ router }) => form => {
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
          router.push('/cms/home');
        }
      });
    }
  ),
  pure
)(Login);
