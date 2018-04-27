import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ButtonAction, DateFormat } from '../../components-ui';
import styles from './styles.css';

export const PageItem = ({
  name,
  icon,
  updateAt,
  id,
  showDeleteModal,
  editPage,
  translations,
  onClick
}) => {
  const styleItem = classnames({
    panel: true,
    'text-center': true,
    [styles.pageItem]: true
  });

  return (
    <div className="col-sm-6 col-lg-3" onClick={onClick}>
      <div className={styleItem}>
        <div className={styles.pageHeader}>
          <h4 className={styles.pageTitle}>{name}</h4>
        </div>
        <div className={styles.pageContent}>
          <DateFormat
            element="p"
            className={styles.pageDate}
            date={updateAt}
            text={translations.LAST_UPDATE}
            fromNow
          />

          <div className={styles.pageActions}>
            <ButtonAction
              type="edit"
              tooltip={translations.EDIT_PAGE}
              onClick={() => editPage(id)}
            />

            <ButtonAction
              type="delete"
              onClick={() => showDeleteModal(id)}
              tooltip={translations.DELETE_PAGE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PageItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  showDeleteModal: PropTypes.func,
  editPage: PropTypes.func,
  icon: PropTypes.shape({
    image: PropTypes.string
  }),
  translations: PropTypes.shape({}),
  onClick: PropTypes.func
};

export default PageItem;
