import React from 'react';
import { compose, withHandlers, withStateHandlers, pure } from 'recompose';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

export const Checkbox = ({ children, name, id, value, onChangeCheck, isChecked, error }) => {
  const customStyles = classnames({
    [styles.customCheck]: true,
    [styles.customCheckActive]: isChecked,
    'parsley-error': error
  });

  return (
    <label className={styles.label} htmlFor={name} id={id}>
      <div className={customStyles}>
        <i className="fas fa-check" />
        <input type="checkbox" name={name} id={name} value={value} onChange={onChangeCheck} />
      </div>
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  onChangeCheck: PropTypes.func,
  isChecked: PropTypes.bool,
  error: PropTypes.bool
};

export default compose(
  withStateHandlers(({ value }) => ({ isChecked: value ? true : false }), {
    setChecked: () => value => ({ isChecked: value })
  }),
  withHandlers({
    onChangeCheck: ({ setChecked, onChange }) => event => {
      setChecked(event.target.checked);
      onChange(event);
    }
  }),
  pure
)(Checkbox);
