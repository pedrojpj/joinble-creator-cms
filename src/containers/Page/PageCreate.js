import { compose, withState, getContext, pure } from 'recompose';
import PropTypes from 'prop-types';
import { withForm } from 'recompose-extends';
import { graphql } from 'react-relay';

import { PageCreate } from '../../components/Page';
import { withMutation } from '../../hoc';

export default compose(
  getContext({ addNotification: PropTypes.func }),
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withForm(
    ({ params }) => ({
      name: { value: '', required: true },
      slug: { value: '', required: true },
      primary: { value: false },
      active: { value: true },
      app: { value: params.id }
    }),
    ({ router, addNotification, translations }) => form => {
      withMutation(
        graphql`
          mutation PageCreateMutation($page: PageInput!) {
            addPage(page: $page) {
              id
            }
          }
        `,
        { page: form }
      ).then(({ addPage: response }) => {
        if (response.id) {
          addNotification({ message: translations.PAGE_CREATED, type: 'success' }, 3000);
          window.history.back();
        }
      });
    }
  ),
  pure
)(PageCreate);
