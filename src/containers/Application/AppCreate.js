import { compose, pure, withState, getContext } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';
import PropTypes from 'prop-types';

import { AppCreate } from '../../components/Application';
import { withQuery, withMutation } from '../../hoc';

export default compose(
  withQuery(
    graphql`
      query AppCreateQuery {
        languages
        platforms {
          name
          code
        }
      }
    `
  ),
  getContext({ addNotification: PropTypes.func }),
  withState(
    'errorMessage',
    'setErrorMessage',
    ({ translations }) => translations.ERROR_FORM
  ),
  withForm(
    {
      name: { value: '', required: true },
      platforms: { value: [], required: true },
      languages: { value: [], required: true },
      domain: {
        value: '',
        pattern: '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}'
      },
      code: {
        value: '',
        pattern: '^[a-z][a-z0-9_]*(.[a-z0-9_]+)+[0-9a-z_]$'
      }
    },
    ({ router, addNotification, translations }) => form => {
      withMutation(
        graphql`
          mutation AppCreateMutation($app: AppInput!) {
            addApp(app: $app) {
              id
            }
          }
        `,
        { app: form }
      ).then(({ addApp }) => {
        if (addApp.id) {
          addNotification(
            { message: translations.APP_CREATED, type: 'success' },
            3000
          );
          router.push({ pathname: '/cms/app/list' });
        }
      });
    }
  ),
  pure
)(AppCreate);
