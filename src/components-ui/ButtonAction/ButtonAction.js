import React from 'react';
import { compose, pure } from 'recompose';
import PropTypes from 'prop-types';
import { EntypoTrash } from 'react-entypo';

import { Tooltip } from '../index';

import styles from './styles.css';

export const ButtonAction = ({ onClick, type, tooltip }) => (
  <Tooltip message={tooltip}>
    <button onClick={onClick} className={styles.button}>
      {type === 'delete' && <EntypoTrash />}
    </button>
  </Tooltip>
);

ButtonAction.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['delete']).isRequired,
  tooltip: PropTypes.string
};

export default compose(pure)(ButtonAction);
