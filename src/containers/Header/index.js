import { compose, withHandlers, withProps, setDisplayName, pure, mapProps } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery, withMutation } from '../../hoc';
import Header from '../../components/Header';
import { LocalStorage } from '../../utils';

export default compose(
  setDisplayName('HeaderContainer'),
  withQuery(graphql`
    query HeaderQuery {
      getUser {
        user {
          name
          email
        }
      }
    }
  `),
  mapProps(({ getUser, ...rest }) => ({
    email: getUser.user.email,
    name: getUser.user.name,
    ...rest
  })),
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
        LocalStorage.remove('AUTH_TOKEN');
        router.push('/auth/login');
      });
    },
    onChangeLanguage: ({ changeLanguage }) => event => {
      const value = event.target.value;
      changeLanguage(value);
    }
  }),
  withProps(({ translations, onLogout, router }) => ({
    userMenu: [
      {
        name: translations.PROFILE,
        onClick: () => router.push('/cms/profile')
      },
      {
        name: translations.LOGOUT,
        onClick: onLogout
      }
    ]
  })),
  pure
)(Header);
