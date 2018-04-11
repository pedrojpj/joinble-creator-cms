import React from 'react';
import { compose, pure } from 'recompose';
import PropTypes from 'prop-types';

import { EntypoTrash } from 'react-entypo';

import styles from './styles.css';

export const ButtonAction = ({ onClick, type }) => (
  <button onClick={onClick} className={styles.button}>
    {type === 'delete' && <EntypoTrash />}
  </button>
);

ButtonAction.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['delete']).isRequired
};

export default compose(pure)(ButtonAction);
