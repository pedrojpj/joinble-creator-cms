import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Tab = ({ children, onClick, active }) => {
  const styleTab = classnames({
    [styles.tab]: true,
    [styles.tabActive]: active
  });

  return (
    <li className={styleTab} onClick={onClick}>
      {children}
    </li>
  );
};

Tab.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.string
};

export default Tab;
