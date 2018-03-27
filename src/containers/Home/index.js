import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import withAuth from '../../hoc/withAuth';
import Home from '../../components/Home';

export default compose(setDisplayName('HomeContainer'), withAuth(), pure)(Home);
