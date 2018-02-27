import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ form, formError, updateForm, submitForm }) => (
  <form name="login">
    <h3>SIGN IN</h3>

    {formError && <p>Todos los campos son obligatorios</p>}

    <label htmlFor="email">
      <input
        type="email"
        name="email"
        autoComplete="off"
        placeholder="Enter your email"
        id="email"
        value={form.email}
        onChange={updateForm}
      />
    </label>

    <label htmlFor="password">
      <input
        type="password"
        name="password"
        autoComplete="off"
        placeholder="Enter your password"
        id="password"
        value={form.password}
        onChange={updateForm}
      />
    </label>

    <button type="submit" onClick={submitForm}>
      Login
    </button>
  </form>
);

Login.propTypes = {
  onLogin: PropTypes.func,
  updateForm: PropTypes.func,
  submitForm: PropTypes.func,
  formError: PropTypes.bool,
  form: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  })
};

export default Login;
