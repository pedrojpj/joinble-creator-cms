import React from 'react';
import PropTypes from 'prop-types';
import { EntypoChevronWithCircleLeft } from 'react-entypo';

import styles from './header.css';
import logo from '../../assets/images/logo.png';

const HeaderAuth = ({ onBack, back }) => (
  <header className={styles.headerAuth}>
    {back && (
      <EntypoChevronWithCircleLeft
        className={styles.buttonBack}
        onClick={onBack}
      />
    )}
    <img src={logo} alt="Joinble" />
  </header>
);

HeaderAuth.propTypes = {
  onBack: PropTypes.func,
  back: PropTypes.bool
};

export default HeaderAuth;
