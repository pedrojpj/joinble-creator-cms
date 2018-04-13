import {
  compose,
  pure,
  lifecycle,
  withHandlers,
  withStateHandlers,
  getContext
} from 'recompose';
import { graphql } from 'react-relay';
import { withModal } from 'recompose-extends';
import PropTypes from 'prop-types';

import { AppList } from '../../components/Application';
import { withQuery, withMutation } from '../../hoc';
import { Modal } from '../../components-ui';

export default compose(
  withStateHandlers(
    { deleteModal: false, dataModal: null },
    {
      showDeleteModal: () => dataModal => ({ deleteModal: true, dataModal }),
      hideDeleteModal: () => () => ({ deleteModal: false })
    }
  ),
  withQuery(
    graphql`
      query AppListQuery {
        apps {
          id
          name
          code
          platform
          icon {
            image
          }
        }
      }
    `
  ),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  getContext({ addNotification: PropTypes.func }),
  withHandlers({
    deleteApp: ({
      showDeleteModal,
      dataModal,
      translations,
      addNotification,
      retryQuery
    }) => id => {
      withMutation(
        graphql`
          mutation AppListMutation($id: ID!) {
            deleteApp(id: $id) {
              status
            }
          }
        `,
        { id: dataModal }
      ).then(({ deleteApp }) => {
        if (deleteApp.status) {
          addNotification(
            {
              message: translations.DELETE_APP_OK,
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
    ({ hideDeleteModal, translations, deleteApp }) => ({
      actions: true,
      onClose: hideDeleteModal,
      onAccept: deleteApp,
      title: translations.DELETE_APP,
      text: translations.DELETE_APP_MESSAGE
    })
  ),
  pure
)(AppList);
