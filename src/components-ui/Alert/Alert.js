import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type, onClose, show }) => (
  <div className={'alert alert-' + type}>
    {onClose && (
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>
    )}
    {message}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['warning', 'success', 'info', 'danger']),
  onClose: PropTypes.func,
  show: PropTypes.bool
};

Alert.defaultProps = {
  type: 'info'
};

export default Alert;
