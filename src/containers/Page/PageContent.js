import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery } from '../../hoc';
import PageContent from '../../components/Page/PageContent';

export default compose(
  withQuery(
    graphql`
      query PageContentQuery {
        widgets {
          name
          description
          icon
        }
      }
    `
  ),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(PageContent);
