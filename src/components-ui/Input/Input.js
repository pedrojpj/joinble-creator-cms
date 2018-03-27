import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classnames from 'classnames';

export const Input = ({
  updateForm,
  name,
  type,
  form,
  placeholder,
  error,
  errorMessage,
  label,
  disabled
}) => {
  let inputStyles = classnames({
    'form-control': true,
    'parsley-error': error,
    'col-md-10': label
  });

  let divStyles = classnames({
    'col-xs-12': !label,
    'col-md-10': label
  });

  return (
    <div className="form-group">
      {label && <label className="col-md-2 control-label">{label}</label>}
      <div className={divStyles}>
        <input
          className={inputStyles}
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={updateForm}
          disabled={disabled}
        />
      </div>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  updateForm: PropTypes.func,
  form: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default compose(pure)(Input);
