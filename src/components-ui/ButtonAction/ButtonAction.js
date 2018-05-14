import React from 'react';
import { compose, pure } from 'recompose';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Tooltip } from '../index';
import styles from './styles.css';

export const ButtonAction = ({ onClick, type, tooltip, theme }) => (
  <Tooltip message={tooltip}>
    <button
      aria-label={type}
      onClick={event => {
        onClick();
        event.stopPropagation();
      }}
      className={classnames({ [styles.button]: true, [styles.buttonDark]: theme === 'dark' })}
    >
      {type === 'delete' && <i className="far fa-trash-alt" />}
      {type === 'edit' && <i className="fas fa-pencil-alt" />}
    </button>
  </Tooltip>
);

ButtonAction.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['delete', 'edit']).isRequired,
  tooltip: PropTypes.string,
  theme: PropTypes.oneOf(['light', 'dark'])
};

ButtonAction.defaultProps = {
  theme: 'light'
};

export default compose(pure)(ButtonAction);
