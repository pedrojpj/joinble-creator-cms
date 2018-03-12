import React from 'react';
import PropTypes from 'prop-types';

import styles from './header.css';

const Header = ({ onLogout, translations, onChangeLanguage, currentLanguage }) => (
  <header className={styles.header}>
    <div className={styles.logo}>logo</div>

    <div className={styles.action}>
      <button onClick={onLogout}>{translations.LOGOUT}</button>
    </div>

    <select name="translations" onChange={onChangeLanguage} value={currentLanguage}>
      <option default value="">
        {translations.SELECT_A_LANGUAGE}
      </option>
      <option value="es">{translations.SPANISH}</option>
      <option value="en">{translations.ENGLISH}</option>
    </select>
  </header>
);

Header.propTypes = {
  onLogout: PropTypes.func,
  translations: PropTypes.shape({})
};

export default Header;
