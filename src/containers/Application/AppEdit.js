import { compose, pure, withState, withHandlers, getContext, withProps } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';
import PropTypes from 'prop-types';

import { AppCreate } from '../../components/Application';
import { withQuery, withMutation } from '../../hoc';

import { CROPS_ICON } from '../../constants';

export default compose(
  withQuery(
    graphql`
      query AppEditQuery($id: ID!) {
        languages
        platforms {
          name
          code
        }
        app(id: $id) {
          id
          name
          code
          platforms
          domain
          icon {
            name
            id
            image
          }
          languages
        }
      }
    `,
    ({ params }) => ({ id: params.id })
  ),
  getContext({ addNotification: PropTypes.func }),
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withProps(({ app }) => ({ icon: app.icon.image ? [app.icon] : [], mode: 'edit' })),
  withForm(
    ({ app }) => ({
      id: { value: app.id || '' },
      name: { value: app.name || '', required: true },
      platforms: { value: app.platforms || [], required: true },
      languages: { value: app.languages || [], required: true },
      domain: {
        value: app.domain || '',
        pattern: '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}'
      },
      code: {
        value: app.code || '',
        pattern: '^[a-z][a-z0-9_]*(.[a-z0-9_]+)+[0-9a-z_]$'
      },
      icon: { value: app.icon ? app.icon.id : '' || '' }
    }),
    ({ router, addNotification, translations }) => form => {
      withMutation(
        graphql`
          mutation AppEditMutation($app: AppInput!) {
            addApp(app: $app) {
              id
            }
          }
        `,
        { app: form }
      ).then(({ addApp }) => {
        if (addApp.id) {
          addNotification({ message: translations.APP_EDITED, type: 'success' }, 3000);
          router.push({ pathname: '/cms/app/list' });
        }
      });
    }
  ),
  withHandlers({
    uploadImage: ({ updateField, addNotification, translations }) => image => {
      let imageFile = { ...image[0], crops: CROPS_ICON };

      withMutation(
        graphql`
          mutation AppEditImageMutation($image: ImageInput!) {
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
        { image: imageFile }
      )
        .then(({ upload }) => {
          updateField('icon', upload.image.id);
        })
        .catch(error => {
          let message = error[0].message;
          addNotification({ message: translations[message], type: 'danger' }, 3000);
        });
    },
    checkEnableCode: ({ form }) => () => {
      if (form.platforms.includes('android')) {
        return false;
      }

      if (form.platforms.includes('ios')) {
        return false;
      }
      return true;
    }
  }),
  pure
)(AppCreate);
