import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import classnames from 'classnames';

import styles from './styles.css';

const Menu = ({ translations }) => {
  const stylesMenu = classnames({
    left: true,
    'side-menu': true,
    [styles.menu]: true
  });

  return (
    <div className={stylesMenu}>
      <div id="sidebar-menu">
        <ul>
          <li>
            <Link to="/cms/app/list" activeClassName="active">
              <i>
                <span className="fab fa-app-store-ios" />
              </i>
              {translations.APPLICATIONS}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Menu.propTypes = {
  translations: PropTypes.shape({})
};

export default Menu;
