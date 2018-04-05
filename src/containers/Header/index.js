import {
  compose,
  withHandlers,
  withProps,
  setDisplayName,
  pure,
  mapProps,
  lifecycle
} from 'recompose';
import { graphql } from 'react-relay';

import { withQuery, withMutation } from '../../hoc';
import { Header } from '../../components/Header';
import { LocalStorage } from '../../utils';

export default compose(
  setDisplayName('HeaderContainer'),
  withQuery(graphql`
    query HeaderQuery {
      getUser {
        user {
          name
          email
          avatar {
            image
          }
        }
      }
    }
  `),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
    }
  }),
  mapProps(({ getUser, ...rest }) => ({
    email: getUser ? getUser.user.email : null,
    name: getUser ? getUser.user.name : null,
    avatar: getUser.user.avatar ? getUser.user.avatar.image : null,
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
  withProps(({ translations, onLogout, router, changeLanguage }) => ({
    userMenu: [
      {
        id: 'profile',
        name: translations.PROFILE,
        onClick: () => router.push('/cms/profile')
      },
      {
        id: 'logout',
        name: translations.LOGOUT,
        onClick: onLogout
      }
    ],
    languageMenu: [
      {
        id: 'spanish',
        name: translations.SPANISH,
        onClick: () => changeLanguage('es')
      },
      {
        id: 'english',
        name: translations.ENGLISH,
        onClick: () => changeLanguage('en')
      }
    ]
  })),
  pure
)(Header);
