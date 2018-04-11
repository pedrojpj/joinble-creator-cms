import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ children }) => (
  <div className="row">
    <div className="col-ms-12">
      <div className="panel panel-primary">
        <div className="panel-body">{children}</div>
      </div>
    </div>
  </div>
);

Panel.propTypes = {
  children: PropTypes.node
};

export default Panel;
