import { compose, withHandlers, pure } from 'recompose';

import Error from '../../components/Error';

export default compose(
  withHandlers({
    onBack: ({ router }) => () => {
      router.push('/');
    }
  }),
  pure
)(Error);
