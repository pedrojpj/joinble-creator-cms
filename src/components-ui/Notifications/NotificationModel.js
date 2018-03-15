import PropTypes from 'prop-types';

export const NotificationModel = PropTypes.shape({
  id: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'danger', 'info', 'warning']),
  primary: PropTypes.bool,
  onClose: PropTypes.string,
  type: PropTypes.string
});
