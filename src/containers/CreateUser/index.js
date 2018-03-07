import { compose, pure, lifecycle } from 'recompose';
import { graphql } from 'react-relay';
import { withForm } from 'recompose-extends';

import { withAnimation, withQuery } from '../../hoc';
import CreateUser from '../../components/CreateUser';

export default compose(
  withAnimation({
    opacity: [0, 1],
    delay: 200,
    translateY: '10em',
    elasticity: function(el, i, l) {
      return 200 + i * 200;
    }
  }),
  withQuery(
    graphql`
      query CreateUserQuery {
        countries {
          name
          code
        }
      }
    `
  ),
  withForm(
    {
      name: {
        value: '',
        required: true
      },
      email: {
        value: '',
        required: true,
        type: 'email'
      },
      password: {
        value: '',
        required: true
      },
      address: {
        value: ''
      },
      city: {
        value: ''
      },
      country: {
        value: ''
      }
    },
    ({ router }) => form => {}
  ),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(CreateUser);
