import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

import { ButtonAction, Image, DateFormat } from '../../components-ui';

export const AppItem = ({
  name,
  icon,
  id,
  updateAt,
  showDeleteModal,
  editApp,
  translations,
  onClick
}) => {
  const styleItem = classnames({
    panel: true,
    'text-center': true,
    [styles.appItem]: true
  });

  return (
    <div className="col-sm-6 col-lg-3" onClick={onClick}>
      <div className={styleItem}>
        <div className={styles.appHeader}>
          <div className={styles.appIcon}>
            <Image src={icon.image} alt={name} />
          </div>

          <h4 className={styles.appTitle}>{name}</h4>
        </div>
        <div className={styles.appContent}>
          <DateFormat
            element="p"
            className={styles.appDate}
            date={updateAt}
            text={translations.LAST_UPDATE}
            fromNow
          />

          <div className={styles.appActions}>
            <ButtonAction type="edit" tooltip={translations.EDIT_APP} onClick={() => editApp(id)} />

            <ButtonAction
              type="delete"
              onClick={() => showDeleteModal(id)}
              tooltip={translations.DELETE_APP}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AppItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  showDeleteModal: PropTypes.func,
  editApp: PropTypes.func,
  updateAt: PropTypes.string,
  icon: PropTypes.shape({
    image: PropTypes.string
  }),
  translations: PropTypes.shape({}),
  onClick: PropTypes.func
};
