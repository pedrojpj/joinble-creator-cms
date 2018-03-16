import { compose, withState, getContext, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';
import PropTypes from 'prop-types';

import { withMutation, withAnimation } from '../../hoc';
import Login from '../../components/Login';
import { animationAuth, LocalStorage } from '../../utils';

export default compose(
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withAnimation(animationAuth, { transform: 'translateY(-10em)' }),
  getContext({ addNotification: PropTypes.func }),
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
    ({
      router,
      errorMessage,
      setErrorMessage,
      formSetError,
      translations,
      addNotification
    }) => form => {
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
      )
        .then(({ login }) => {
          let newError = translations.ERROR_FORM + '<br />';
          if (login.errors) {
            login.errors.map(error => {
              newError += `- ${error.key}: ${error.value}`;
              formSetError(error.key);
              return error;
            });

            setErrorMessage(newError);
          }

          if (login.token) {
            LocalStorage.set('AUTH_TOKEN', login.token.token);
            router.push('/cms/home');
            addNotification(
              { message: `${translations.WELCOME}, ${login.user.name}`, type: 'info' },
              3000
            );
          }
        })
        .catch(error => {
          router.push({ pathname: '/error', state: { error } });
        });
    }
  ),
  pure
)(Login);
