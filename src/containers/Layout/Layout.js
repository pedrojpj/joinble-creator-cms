import { compose, lifecycle, pure } from 'recompose';

import { Layout } from '../../components/Layout';
import withTranslations from '../../hoc/withTranslations';

export default compose(
  withTranslations(),
  lifecycle({
    componentDidMount() {
      console.log(this.props);
    }
  }),
  pure
)(Layout);
