import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Notification = ({ onRemove, message, id, type }) => {
  const styleNotification = classNames({
    alert: true,
    'alert-success': type === 'success',
    'alert-info': type === 'info',
    'alert-warning': type === 'warning',
    'alert-danger': type === 'danger',
    'alert-dismissible': true,
    fade: true,
    in: true
  });

  return (
    <div className={styleNotification}>
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
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'warning', 'info', 'danger']),
  onRemove: PropTypes.func
};

Notification.defaultProps = {
  type: 'success'
};
