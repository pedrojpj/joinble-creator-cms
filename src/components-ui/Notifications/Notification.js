import React from 'react';
import PropTypes from 'prop-types';

export const Notification = ({ onRemove, message, id, type }) => (
  <div className="alert alert-success alert-dismissible fade in">
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
      onClick={() => onRemove(id)}
    >
      <span aria-hidden="true">×</span>
    </button>
    {message}
  </div>
);

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onRemove: PropTypes.func
};
