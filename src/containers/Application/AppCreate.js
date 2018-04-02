import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { AppCreate } from '../../components/Application';
import { withQuery } from '../../hoc';

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
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  withForm({
    name: { value: '', required: true }
  }),
  pure
)(AppCreate);
