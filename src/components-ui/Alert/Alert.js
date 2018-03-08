import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withAnimation } from '../../hoc';

export const Alert = ({ message, type, onClose, show, children }) => (
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
    {message} {children && <span dangerouslySetInnerHTML={{ __html: children }} />}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.oneOf(['warning', 'success', 'info', 'danger']),
  onClose: PropTypes.func,
  show: PropTypes.bool
};

Alert.defaultProps = {
  type: 'info'
};

export default compose(
  withAnimation({
    opacity: [0, 1],
    translateY: '1em'
  }),
  pure
)(Alert);
