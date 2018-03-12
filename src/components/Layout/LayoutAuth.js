import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

export const LayoutAuth = ({ children, ...rest }) => {
  return (
    <div>
      <div className="accountbg" />
      <div className="wrapper-page">{cloneElement(children, { ...rest })}</div>
    </div>
  );
};

LayoutAuth.propTypes = {
  children: PropTypes.node
};
