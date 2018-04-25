import { compose, withState, withProps, getContext, setDisplayName, pure } from 'recompose';
import PropTypes from 'prop-types';
import { withForm } from 'recompose-extends';
import { graphql } from 'react-relay';

import { PageCreate } from '../../components/Page';
import { withMutation, withQuery } from '../../hoc';

export default compose(
  setDisplayName('PageEditContainer'),
  getContext({ addNotification: PropTypes.func }),
  withProps({ mode: 'edit' }),
  withState('errorMessage', 'setErrorMessage', ({ translations }) => translations.ERROR_FORM),
  withQuery(
    graphql`
      query PageEditQuery($id: ID!) {
        page(id: $id) {
          id
          name
          slug
          app
          active
          primary
        }
      }
    `,
    ({ params }) => ({ id: params.pageId })
  ),
  withForm(
    ({ page }) => ({
      id: { value: page.id },
      name: { value: page.name, required: true },
      slug: { value: page.slug, required: true },
      primary: { value: page.primary },
      active: { value: page.active },
      app: { value: page.app }
    }),
    ({ router, addNotification, translations }) => form => {
      withMutation(
        graphql`
          mutation PageEditMutation($page: PageInput!) {
            addPage(page: $page) {
              id
            }
          }
        `,
        { page: form }
      ).then(({ addPage: response }) => {
        if (response.id) {
          addNotification({ message: translations.PAGE_EDITED, type: 'success' }, 3000);
          window.history.back();
        }
      });
    }
  ),
  pure
)(PageCreate);
