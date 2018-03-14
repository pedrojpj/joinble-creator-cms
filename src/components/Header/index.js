import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogModel } from '../../components-ui';
import styles from './header.css';

const Header = ({ onLogout, translations, onChangeLanguage, currentLanguage, userMenu, name }) => (
  <header className={styles.header}>
    <div className={styles.logo}>logo</div>

    <div className={styles.action}>
      <button onClick={onLogout}>{translations.LOGOUT}</button>
    </div>

    <Dialog items={userMenu}>
      <span id="username">{name}</span>
    </Dialog>

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
  translations: PropTypes.shape({}),
  userMenu: DialogModel,
  name: PropTypes.string
};

export default Header;
