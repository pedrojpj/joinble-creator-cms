import { compose, pure } from 'recompose';

import { Layout } from '../../components/Layout';
import { withTranslations } from '../../hoc';

export default compose(withTranslations(), pure)(Layout);
