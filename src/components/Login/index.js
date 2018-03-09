import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';

import { Alert, Input } from '../../components-ui';

const Login = ({ form, formError, formFieldsWithErrors, updateForm, submitForm, errorMessage }) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <h3 className="text-center m-t-0 m-b-15">logo</h3>
      <h4 className="text-muted text-center m-t-0">
        <b>Sign In</b>
      </h4>

      <form className="form-horizontal m-t-20" name="login">
        <div className="form-group">
          <div className="col-xs-12">
            {formError && <Alert type="danger">{errorMessage}</Alert>}
          </div>
        </div>

        <Input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter your email"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('email')}
        />

        <Input
          type="password"
          name="password"
          autoComplete="off"
          placeholder="Enter your password"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('password')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button onClick={submitForm} className="btn btn-primary btn-block btn-lg" type="submit">
              Log In
            </button>
          </div>
        </div>

        <div className="form-group m-t-30 m-b-0">
          <div className="col-sm-7">
            {' '}
            <a href="pages-recoverpw.html" className="text-muted">
              <i className="fa fa-lock m-r-5" /> Forgot your password?
            </a>
          </div>
          <div className="col-sm-5 text-right">
            {' '}
            <Link to="/auth/create-user" className="text-muted">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </div>
  </div>
);

Login.propTypes = {
  onLogin: PropTypes.func,
  updateForm: PropTypes.func,
  submitForm: PropTypes.func,
  formError: PropTypes.bool,
  form: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  formFieldsWithErrors: PropTypes.arrayOf(PropTypes.string),
  errorMessage: PropTypes.string
};

export default Login;
