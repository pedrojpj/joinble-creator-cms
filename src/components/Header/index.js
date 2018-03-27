import React from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogModel } from '../../components-ui';
import styles from './header.css';

const Header = ({
  onLogout,
  translations,
  onChangeLanguage,
  currentLanguage,
  iconCurrentLanguage,
  userMenu,
  languageMenu,
  name
}) => (
  <header className="topbar">
    <div className="topbar-left">logo</div>

    <div className="navbar navbar-default" role="navigation">
      <div className="container">
        <div className="pull-right">
          <Dialog items={userMenu} className={styles.navItems} position="right">
            <span className={styles.icon} id="username">
              {name}
            </span>
          </Dialog>

          <Dialog
            items={languageMenu}
            className={styles.navItems}
            position="right"
          >
            <span className={styles.icon} id="language">
              <img src={iconCurrentLanguage} alt={currentLanguage} />
            </span>
          </Dialog>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  onLogout: PropTypes.func,
  translations: PropTypes.shape({}),
  userMenu: DialogModel,
  languageMenu: DialogModel,
  name: PropTypes.string,
  iconCurrentLanguage: PropTypes.string
};

export default Header;
