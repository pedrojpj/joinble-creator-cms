import React from 'react';
import PropTypes from 'prop-types';

import styles from './header.css';

const Header = ({ onLogout }) => (
  <header className={styles.header}>
    <div className={styles.logo}>logo</div>

    <div className={styles.action}>
      <button onClick={onLogout}>Logout</button>
    </div>
  </header>
);

Header.propTypes = {
  onLogout: PropTypes.func
};

export default Header;
