import { compose, withState, withStateHandlers, getContext, pure } from 'recompose';
import { graphql } from 'react-relay';
import { withForm, withModal } from 'recompose-extends';
import PropTypes from 'prop-types';

import { withMutation, withAnimation, withQuery } from '../../hoc';
import { animationAuth, LocalStorage } from '../../utils';
import CreateUser from '../../components/CreateUser';
import { Modal } from '../../components-ui';

export default compose(
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withStateHandlers(
    { showConditionsModal: false },
    {
      showConditions: () => () => ({ showConditionsModal: true }),
      hideConditions: () => () => ({ showConditionsModal: false })
    }
  ),
  withAnimation(animationAuth, { transform: 'translateY(-10em)' }),
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
  getContext({ addNotification: PropTypes.func }),
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
      },
      conditions: {
        value: false,
        required: true
      }
    },
    ({
      router,
      setErrorMessage,
      errorMessage,
      formSetError,
      translations,
      addNotification
    }) => form => {
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
        let newError = translations.ERROR_FORM + '<br />';
        if (createUser.errors) {
          createUser.errors.map(error => {
            newError += `- ${error.key}: ${error.value}`;
            formSetError(error.key);
            return error;
          });

          setErrorMessage(newError);
        }

        if (createUser.token) {
          LocalStorage.set('AUTH_TOKEN', createUser.token.token);
          router.push('/cms/home');
          addNotification(
            {
              message: `${translations.WELCOME}, ${createUser.user.name}`,
              type: 'info'
            },
            3000
          );
        }
      });
    }
  ),
  withModal(
    ({ showConditionsModal }) => showConditionsModal,
    Modal,
    ({ translations, hideConditions }) => ({
      title: translations.CONDITIONS_USE,
      text: translations.CONDITIONS_USE_TEXT,
      onClose: () => hideConditions()
    })
  ),
  pure
)(CreateUser);
