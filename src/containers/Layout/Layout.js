import { compose, pure } from 'recompose';

import { Layout } from '../../components/Layout';
import withTranslations from '../../hoc/withTranslations';

export default compose(withTranslations(), pure)(Layout);
