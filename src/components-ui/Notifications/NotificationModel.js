import PropTypes from 'prop-types';

export const NotificationModel = PropTypes.shape({
  id: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.string,
  type: PropTypes.string
});
