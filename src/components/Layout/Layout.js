import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../containers';

export const Layout = ({ children, ...rest }) => {
  return (
    <div>
      <Header {...rest} />
      {cloneElement(children, { ...rest })}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
