import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classnames from 'classnames';

export const Input = ({ updateForm, name, type, form, placeholder, error, errorMessage }) => {
  let inputStyles = classnames({
    'form-control': true,
    'parsley-error': error
  });

  return (
    <div className="form-group">
      <div className="col-xs-12">
        <input
          className={inputStyles}
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={updateForm}
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
  form: PropTypes.shape({}),
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default compose(pure)(Input);
