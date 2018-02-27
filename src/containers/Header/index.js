import { compose, setDisplayName, pure } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery } from '../../hoc';
import Header from '../../components/Header';

export default compose(
  setDisplayName('HeaderContainer'),
  withQuery(graphql`
    query HeaderQuery {
      getUser {
        name
        email
      }
    }
  `),
  pure
)(Header);
