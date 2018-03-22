import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery } from '../../hoc';
import Profile from '../../components/Profile';

export default compose(
  withQuery(
    graphql`
      query ProfileQuery {
        getUser {
          user {
            email
            name
            country
            city
            address
          }
        }
        countries {
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
  pure
)(Profile);
