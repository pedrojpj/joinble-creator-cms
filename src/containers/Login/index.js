import { compose, withState, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withMutation, withAnimation } from '../../hoc';
import Login from '../../components/Login';
import { animationAuth } from '../../utils';

const errorText = 'There are errors in the form';

export default compose(
  withState('errorMessage', 'setErrorMessage', errorText),
  withAnimation(animationAuth, { transform: 'translateY(-10em)' }),
  withForm(
    {
      email: {
        value: '',
        required: true,
        type: 'email'
      },
      password: {
        value: '',
        required: true
      }
    },
    ({ router, errorMessage, setErrorMessage, formSetError }) => form => {
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
              errors {
                key
                value
              }
            }
          }
        `,
        { login: form }
      ).then(({ login }) => {
        let newError = errorText + '<br />';
        if (login.errors) {
          login.errors.map(error => {
            newError += `- ${error.key}: ${error.value}`;
            formSetError(error.key);
            return error;
          });

          setErrorMessage(newError);
        }

        if (login.token) {
          localStorage.setItem('AUTH_TOKEN', login.token.token);
          router.push('/cms/home');
        }
      });
    }
  ),
  pure
)(Login);
