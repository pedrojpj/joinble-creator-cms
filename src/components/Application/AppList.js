import React from 'react';
import PropTypes from 'prop-types';
import { EntypoPlus } from 'react-entypo';

import { Title } from '../../components-ui';
import { AppItem } from '.';
import styles from './styles.css';

export const AppList = ({ translations, apps, router, ...rest }) => (
  <div>
    <Title>{translations.APPLICATIONS}</Title>

    <div className="page-content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <button
              className={styles.buttonApp}
              onClick={() => router.push('/cms/app/create')}
            >
              <span>
                <EntypoPlus />
              </span>

              {translations.NEW_APPLICATION}
            </button>
          </div>
          {apps.map(app => <AppItem key={app.id} {...app} {...rest} />)}
        </div>
      </div>
    </div>
  </div>
);

AppList.propTypes = {
  translations: PropTypes.shape({}),
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string
    })
  )
};
