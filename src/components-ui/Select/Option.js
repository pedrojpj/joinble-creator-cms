import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './styles.css';

const Option = ({ value, children, onClick, selected }) => (
  <div
    aria-selected={selected}
    className={cn({ [styles.option]: true, [styles.optionSelected]: selected })}
    value={value}
    onClick={() => onClick(value, children)}
  >
    {children}
  </div>
);

Option.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

Option.defaultProps = {
  selected: false,
  onClick: undefined
};

export default Option;
