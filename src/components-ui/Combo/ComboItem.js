import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classnames from 'classnames';

import Tooltip from '../Tooltip/Tooltip';

export const ComboItem = ({ children, value, onSelect, className, selected, tooltip }) => {
  const comboStyle = classnames({
    [className]: className,
    selected: selected
  });

  return (
    <Tooltip message={tooltip}>
      <div
        className={comboStyle}
        onClick={() => onSelect(value)}
        aria-selected={selected}
        role="option"
      >
        {children}
      </div>
    </Tooltip>
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
