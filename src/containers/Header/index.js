import { compose, withHandlers, setDisplayName, pure } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery, withMutation } from '../../hoc';
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
  withHandlers({
    onLogout: ({ history }) => () => {
      withMutation(
        graphql`
          mutation HeaderMutation($token: String!) {
            logout(token: $token) {
              status
            }
          }
        `,
        { token: localStorage.getItem('AUTH_TOKEN') }
      ).then(({ login }) => {
        if (login.token) {
          localStorage.removeItem('AUTH_TOKEN');
          history.push('/home');
        }
      });
    }
  }),
  pure
)(Header);
