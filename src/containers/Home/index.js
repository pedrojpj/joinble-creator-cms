import { compose, setDisplayName, pure } from 'recompose';

import { withForm } from 'recompose-extends';

import withAuth from '../../hoc/withAuth';
import Home from '../../components/Home';

export default compose(
  setDisplayName('HomeContainer'),
  withForm({ select: { value: '' }, selectMultiple: { value: [], required: true } }, () => form => {
    console.log(form);
  }),
  withAuth(),
  pure
)(Home);
