import PropTypes from 'prop-types';

export const DialogModel = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    onClick: PropTypes.func,
    separator: PropTypes.bool
  })
);
