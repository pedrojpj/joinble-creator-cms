import React from 'react';
import cn from 'classnames';

import styles from './styles.css';

const Option = ({ value, children, onClick, selected }) => (
  <div
    className={cn({ [styles.option]: true, [styles.optionSelected]: selected })}
    value={value}
    onClick={() => onClick(value)}
  >
    {children}
  </div>
);

export default Option;
