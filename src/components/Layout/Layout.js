import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../containers';

export const Layout = ({ children, ...rest }) => (
  <div>
    <Header {...rest} />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};
