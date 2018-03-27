import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'found';

import { Dialog, DialogModel } from '../../components-ui';
import styles from './header.css';

import logo from '../../assets/images/logoWhite.png';

const Header = ({
  onLogout,
  translations,
  onChangeLanguage,
  currentLanguage,
  iconCurrentLanguage,
  userMenu,
  languageMenu,
  name
}) => {
  const styleTopBarLeft = classnames({
    'topbar-left': true,
    [styles.topBarCenter]: true
  });

  return (
    <header className="topbar">
      <div className={styleTopBarLeft}>
        <Link to="/">
          <img src={logo} alt="Joinble" />
        </Link>
      </div>

      <div className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="pull-right">
            <Dialog
              items={userMenu}
              className={styles.navItems}
              position="right"
            >
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
};

Header.propTypes = {
  onLogout: PropTypes.func,
  translations: PropTypes.shape({}),
  userMenu: DialogModel,
  languageMenu: DialogModel,
  name: PropTypes.string,
  iconCurrentLanguage: PropTypes.string
};

export default Header;
