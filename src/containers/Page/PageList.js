import { compose, withHandlers, withStateHandlers, getContext, pure } from 'recompose';
import { graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { withModal } from 'recompose-extends';

import { withQuery, withMutation } from '../../hoc';
import { PageList } from '../../components/Page';
import { Modal } from '../../components-ui';

export default compose(
  withStateHandlers(
    { deleteModal: false, dataModal: null },
    {
      showDeleteModal: () => dataModal => ({ deleteModal: true, dataModal }),
      hideDeleteModal: () => () => ({ deleteModal: false })
    }
  ),
  getContext({ addNotification: PropTypes.func }),
  withQuery(
    graphql`
      query PageListQuery($app: ID!) {
        pages(app: $app) {
          id
          name
          primary
          updateAt
        }
      }
    `,
    ({ params }) => ({ app: params.id })
  ),
  withHandlers({
    editPage: ({ router, params }) => id => router.push(`/cms/app/${params.id}/pages/edit/${id}`),
    deletePage: ({
      showDeleteModal,
      dataModal,
      translations,
      addNotification,
      retryQuery
    }) => id => {
      withMutation(
        graphql`
          mutation PageListMutation($id: ID!) {
            deletePage(id: $id) {
              status
            }
          }
        `,
        { id: dataModal }
      ).then(({ deletePage: response }) => {
        if (response.status) {
          addNotification(
            {
              message: translations.DELETE_PAGE_OK,
              type: 'success'
            },
            3000
          );

          retryQuery();
        }
      });
    }
  }),
  withModal(
    ({ deleteModal }) => deleteModal,
    Modal,
    ({ hideDeleteModal, translations, deletePage }) => ({
      actions: true,
      onClose: hideDeleteModal,
      onAccept: deletePage,
      title: translations.DELETE_PAGE,
      text: translations.DELETE_PAGE_MESSAGE
    })
  ),
  pure
)(PageList);
