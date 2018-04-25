import { compose, lifecycle, pure } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery } from '../../hoc';
import { PageList } from '../../components/Page';

export default compose(
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
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(PageList);
