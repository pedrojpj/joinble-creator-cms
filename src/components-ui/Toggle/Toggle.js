import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  setDisplayName,
  withHandlers,
  withStateHandlers,
  defaultProps,
  pure
} from 'recompose';
import classnames from 'classnames';

import styles from './styles.css';

const Toggle = ({ children, name, value, onChangeToggle, error, isChecked }) => {
  const customStyles = classnames({
    [styles.customToggle]: true,
    [styles.customToggleActive]: isChecked,
    'parsley-error': error
  });

  return (
    <label>
      <div className={customStyles}>
        <span />
        <input
          type="checkbox"
          name={name}
          id={name}
          value={value}
          checked={isChecked}
          onChange={onChangeToggle}
        />
      </div>
      {children}
    </label>
  );
};

Toggle.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  onChangeToggle: PropTypes.func,
  error: PropTypes.bool,
  isChecked: PropTypes.bool,
  refs: PropTypes.shape({})
};

export default compose(
  setDisplayName('ToggleComponent'),
  defaultProps({
    onChange: () => {}
  }),
  withStateHandlers(({ value }) => ({ isChecked: value ? true : false }), {
    setChecked: () => value => ({ isChecked: value })
  }),
  withHandlers({
    onChangeToggle: ({ setChecked, onChange }) => event => {
      setChecked(event.target.checked);
      onChange(event);
    }
  }),
  pure
)(Toggle);
