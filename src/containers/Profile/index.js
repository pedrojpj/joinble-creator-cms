import { compose, pure, getContext } from 'recompose';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withQuery, withMutation } from '../../hoc';
import Profile from '../../components/Profile';

export default compose(
  withQuery(
    graphql`
      query ProfileQuery {
        getUser {
          user {
            email
            name
            country
            city
            address
          }
        }
        countries {
          name
          code
        }
      }
    `
  ),
  getContext({ addNotification: PropTypes.func }),
  withForm(
    ({ getUser }) => ({
      name: { value: getUser.user.name, required: true },
      email: { value: getUser.user.email, required: true },
      address: { value: getUser.user.address || '' },
      city: { value: getUser.user.city || '' },
      country: { value: getUser.user.country || '' }
    }),
    ({ translations, formSetError, setErrorMessage, router, addNotification }) => form => {
      withMutation(
        graphql`
          mutation ProfileMutation($user: ProfileInput!) {
            updateUser(user: $user) {
              user {
                id
                name
                email
                city
                country
                address
              }
              errors {
                key
                value
              }
            }
          }
        `,
        { user: form }
      )
        .then(({ updateUser }) => {
          let newError = translations.ERROR_FORM + '<br />';
          if (updateUser.errors.length) {
            updateUser.errors.map(error => {
              newError += `- ${error.key}: ${error.value}`;
              formSetError(error.key);
              return error;
            });

            setErrorMessage(newError);
          }

          if (updateUser.user) {
            addNotification({ message: translations.PROFILE_UPDATE }, 3000);
          }
        })
        .catch(error => {
          router.push({ pathname: '/error', state: { error } });
        });
    }
  ),
  pure
)(Profile);
