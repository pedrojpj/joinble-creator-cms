import { compose, pure, mapProps, withHandlers, getContext } from 'recompose';
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
            avatar {
              name
              id
              image
            }
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
  mapProps(({ getUser, ...rest }) => ({
    user: getUser.user,
    ...rest
  })),
  withForm(
    ({ user }) => ({
      name: { value: user.name, required: true },
      email: { value: user.email, required: true },
      address: { value: user.address || '' },
      city: { value: user.city || '' },
      country: { value: user.country || '' },
      avatar: { value: user.avatar ? user.avatar.token : '' }
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
                avatar {
                  name
                  image
                  id
                }
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
  withHandlers({
    uploadImage: ({ updateField, addNotification, translations }) => value => {
      if (!value.length) {
        updateField('avatar', '');
      } else {
        withMutation(
          graphql`
            mutation ProfileImageMutation($image: ImageInput!) {
              upload(image: $image) {
                errors {
                  key
                  value
                }
                image {
                  name
                  image
                  id
                }
              }
            }
          `,
          { image: value[0] }
        )
          .then(({ upload }) => {
            updateField('avatar', upload.image.id);
          })
          .catch(error => {
            let message = error[0].message;
            console.log(message);
            addNotification({ message: translations[message], type: 'danger' }, 3000);
          });
      }
    }
  }),
  pure
)(Profile);
