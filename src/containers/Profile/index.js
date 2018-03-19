import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery, withFragment, withEnv } from '../../hoc';
import Profile from '../../components/Profile';

export default compose(
  withFragment(
    graphql`
      fragment ProfileUser on User {
        email
        name
        country
        city
        address
      }
    `
  ),
  withQuery(
    graphql`
      query ProfileQuery {
        getUser {
          user {
            ...ProfileUser
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
  pure
)(Profile);
