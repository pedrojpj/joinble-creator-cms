import { compose, withHandlers, withProps, pure, mapProps } from 'recompose';

import Error from '../../components/Error';
import { withTranslations } from '../../hoc';

export default compose(
  withTranslations(),
  mapProps(({ location, ...rest }) => ({
    ...location,
    ...rest
  })),
  withProps(({ code, state }) => ({
    code: state ? state.error.code : code
  })),
  withProps(({ message, translations, code, state, error }) => ({
    message: message || translations.ERRORS[code],
    error: state ? state.error : error
  })),
  withHandlers({
    onBack: ({ router }) => () => {
      router.push('/');
    }
  }),
  pure
)(Error);
