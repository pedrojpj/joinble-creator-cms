import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin, form, updateForm }) => (
  <form name="login">
    <h3>SIGN IN</h3>

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

    <button type="submit" onClick={onLogin}>
      Login
    </button>
  </form>
);

Login.propTypes = {
  onLogin: PropTypes.func,
  updateForm: PropTypes.func,
  form: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  })
};

export default Login;
