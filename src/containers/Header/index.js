import { compose, withHandlers, withProps, setDisplayName, pure, mapProps } from 'recompose';
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
  mapProps(({ getUser, ...rest }) => ({ ...getUser, ...rest })),
  withHandlers({
    onLogout: ({ router }) => () => {
      withMutation(
        graphql`
          mutation HeaderMutation($token: String!) {
            logout(token: $token) {
              status
            }
          }
        `,
        { token: localStorage.getItem('AUTH_TOKEN') }
      ).then(response => {
        localStorage.removeItem('AUTH_TOKEN');
        router.push('/auth/login');
      });
    },
    onChangeLanguage: ({ changeLanguage }) => event => {
      const value = event.target.value;
      changeLanguage(value);
    }
  }),
  withProps(({ translations, onLogout }) => ({
    userMenu: [
      {
        name: translations.PROFILE,
        onClick: () => {}
      },
      {
        name: translations.LOGOUT,
        onClick: onLogout
      }
    ]
  })),
  pure
)(Header);
