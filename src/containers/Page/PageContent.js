import { compose, pure, withHandlers, withReducer } from 'recompose';
import { graphql } from 'react-relay';
import { withActions } from 'recompose-extends';

import { withQuery } from '../../hoc';
import { reducer, initialState, addWidget, removeWidget } from '../../reducers/widgets';
import PageContent from '../../components/Page/PageContent';

export default compose(
  withQuery(
    graphql`
      query PageContentQuery {
        widgets(type: "page") {
          name
          description
          icon
          type
          repeat
          selector
          content {
            component
            name
            required
            value
            repeat
          }
        }
      }
    `
  ),
  withReducer('state', 'dispatch', reducer, initialState),
  withActions({
    addWidget,
    removeWidget
  }),
  withHandlers({
    onDragWidget: () => (event, widget) => {
      event.dataTransfer.setData('widget', JSON.stringify(widget));
    },
    onDropWidget: ({ addWidget }) => (event, type) => {
      const widget = JSON.parse(event.dataTransfer.getData('widget'));

      addWidget(widget);
    }
  }),
  pure
)(PageContent);
