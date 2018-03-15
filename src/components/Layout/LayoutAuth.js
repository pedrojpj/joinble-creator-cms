import React, { cloneElement, Fragment } from 'react';
import PropTypes from 'prop-types';

export const LayoutAuth = ({ children, ...rest }) => {
  return (
    <Fragment>
      <div className="accountbg" />
      <div className="wrapper-page">{cloneElement(children, { ...rest })}</div>
    </Fragment>
  );
};

LayoutAuth.propTypes = {
  children: PropTypes.node
};
