import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => (
  <div className="page-header-title">
    <h4 className="page-title">{children}</h4>
  </div>
);

Title.propTypes = {
  children: PropTypes.string
};

export default Title;
