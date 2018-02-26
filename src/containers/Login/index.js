import { compose, withHandlers, lifecycle, pure } from 'recompose';
import { graphql } from 'react-relay';

import { withQuery, withForm, withMutation } from '../../hoc';
import Login from '../../components/Login';

export default compose(
  withQuery(graphql`
    query LoginQuery {
      translations
    }
  `),
  withForm({
    email: '',
    password: ''
  }),
  withHandlers({
    onLogin: ({ form }) => event => {
      event.preventDefault();

      console.log(form);
      withMutation(
        graphql`
          mutation LoginMutation($input: Login!) {
            login(email: $email, password: $password) {
              user
              token
            }
          }
        `,
        { input: form }
      ).then(res => console.log(res));
    }
  }),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(Login);
