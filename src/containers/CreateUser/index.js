import { compose, withState, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withMutation, withAnimation, withQuery } from '../../hoc';
import CreateUser from '../../components/CreateUser';

const errorText = 'There are errors in the form';

export default compose(
  withState('errorMessage', 'setErrorMessage', errorText),
  withAnimation(
    {
      opacity: [0, 1],
      delay: 200,
      translateY: '0em',
      elasticity: function(el, i, l) {
        return 200 + i * 200;
      }
    },
    { transform: 'translateY(-10em)' }
  ),
  withQuery(
    graphql`
      query CreateUserQuery {
        countries {
          name
          code
        }
      }
    `
  ),
  withForm(
    {
      name: {
        value: '',
        required: true
      },
      email: {
        value: '',
        required: true,
        type: 'email'
      },
      password: {
        value: '',
        required: true,
        pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$'
      },
      address: {
        value: ''
      },
      city: {
        value: ''
      },
      country: {
        value: ''
      }
    },
    ({ router, setErrorMessage, errorMessage, formSetError }) => form => {
      withMutation(
        graphql`
          mutation CreateUserMutation($user: UserInput!) {
            createUser(user: $user) {
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
        { user: form }
      ).then(({ createUser }) => {
        let newError = errorText + '<br />';
        if (createUser.errors) {
          createUser.errors.map(error => {
            newError += `- ${error.key}: ${error.value}`;
            formSetError(error.key);
            return error;
          });

          setErrorMessage(newError);
        }

        if (createUser.token) {
          localStorage.setItem('AUTH_TOKEN', createUser.token.token);
          router.push('/cms/home');
        }
      });
    }
  ),
  pure
)(CreateUser);
