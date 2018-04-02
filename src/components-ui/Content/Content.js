import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => (
  <div className="page-content-wrapper">
    <div className="container">{children}</div>
  </div>
);

Content.propTypes = {
  children: PropTypes.node
};

export default Content;
