import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';

import { AppList } from '../../components/Application';
import { withQuery } from '../../hoc';

export default compose(
  withQuery(
    graphql`
      query AppListQuery {
        apps {
          name
          code
          platform
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
)(AppList);
