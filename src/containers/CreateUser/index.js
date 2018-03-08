import { compose, withState, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withMutation, withAnimation, withQuery } from '../../hoc';
import CreateUser from '../../components/CreateUser';

export default compose(
  withState('errorMessage', 'setErrorMessage', 'There are errors in the form'),
  withAnimation({
    opacity: [0, 1],
    delay: 200,
    translateY: '10em',
    elasticity: function(el, i, l) {
      return 200 + i * 200;
    }
  }),
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
        let newError = errorMessage + '<br />';
        if (createUser.errors) {
          createUser.errors.map(error => {
            newError += `- ${error.key}: ${error.value}`;
            formSetError(error.key);
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
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(CreateUser);
