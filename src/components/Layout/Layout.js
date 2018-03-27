import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../containers';

export const Layout = ({ children, ...rest }) => {
  return (
    <div id="wrapper">
      <Header {...rest} />

      <div className="content-page">
        <div className="content">{cloneElement(children, { ...rest })}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
