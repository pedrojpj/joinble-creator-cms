import React from 'react';
import { compose, withHandlers, withStateHandlers, pure } from 'recompose';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Checkbox = ({ children, name, value, onChangeCheck, isChecked }) => {
  const customStyles = classnames({
    [styles.customCheck]: true,
    [styles.customCheckActive]: isChecked
  });

  return (
    <label className={styles.label}>
      <div className={customStyles}>
        <i class="fas fa-check" />
        <input type="checkbox" name={name} value={value} onChange={onChangeCheck} />
      </div>
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.bool, PropTypes.number]),
  onChangeCheck: PropTypes.func,
  isChecked: PropTypes.bool
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
