import React from 'react';
import PropTypes from 'prop-types';

export const LayoutAuth = ({ children }) => (
  <div>
    <div className="accountbg" />
    <div className="wrapper-page">{children}</div>
  </div>
);

LayoutAuth.propTypes = {
  children: PropTypes.node
};
