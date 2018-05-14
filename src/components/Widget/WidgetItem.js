import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

import styles from './styles.css';
import { ButtonAction } from '../../components-ui';

const WidgetItem = ({ name, id, translations, onDelete, onEdit }) => (
  <div className={styles.widgetItem}>
    <h4>{name}</h4>

    <div className={styles.widgetItemActions}>
      <ButtonAction
        type="edit"
        tooltip={translations.EDIT_WIDGET}
        theme="dark"
        onClick={() => onEdit(id)}
      />
      <ButtonAction
        type="delete"
        tooltip={translations.DELETE_WIDGET}
        theme="dark"
        onClick={() => onDelete(id)}
      />
    </div>
  </div>
);

WidgetItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  translations: PropTypes.shape({}),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default SortableElement(WidgetItem);
