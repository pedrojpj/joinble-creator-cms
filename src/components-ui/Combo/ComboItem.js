import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classnames from 'classnames';

export const ComboItem = ({ children, value, onSelect, className, selected }) => {
  const comboStyle = classnames({
    [className]: true,
    selected: selected
  });

  return (
    <div
      className={comboStyle}
      onClick={() => onSelect(value)}
      aria-selected={selected}
      role="option"
    >
      {children}
    </div>
  );
};

ComboItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  selected: PropTypes.bool
};

export default compose(pure)(ComboItem);
