import { compose, pure } from 'recompose';

import { LayoutAuth } from '../../components/Layout';
import { withTranslations } from '../../hoc';

export default compose(withTranslations(), pure)(LayoutAuth);
