import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

import { ButtonAction } from '../../components-ui';

export const AppItem = ({ name, id, showDeleteModal }) => {
  const styleItem = classnames({
    panel: true,
    'text-center': true,
    [styles.appItem]: true
  });

  return (
    <div className="col-sm-6 col-lg-3">
      <div className={styleItem}>
        <div className={styles.appHeader}>
          <h4>{name}</h4>
        </div>
        <div className={styles.appContent}>
          <div className={styles.appActions}>
            <ButtonAction type="delete" onClick={() => showDeleteModal(id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

AppItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  showDeleteModal: PropTypes.func
};
