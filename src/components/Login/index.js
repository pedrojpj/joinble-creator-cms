import React from 'react';
import PropTypes from 'prop-types';

import { LayoutAuth } from '../Layout';
import { Alert } from '../../components-ui';

const Login = ({ form, formError, updateForm, submitForm }) => (
  <LayoutAuth>
    <div className="panel panel-color panel-primary panel-pages">
      <div className="panel-body">
        <h3 className="text-center m-t-0 m-b-15">logo</h3>
        <h4 className="text-muted text-center m-t-0">
          <b>Sign In</b>
        </h4>

        <form className="form-horizontal m-t-20" name="login">
          <div className="form-group">
            <div className="col-xs-12">
              {formError && <Alert type="danger" message="Todos los campos son obligatorios" />}
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-12">
              <input
                className="form-control"
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email"
                id="email"
                value={form.email}
                onChange={updateForm}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-12">
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                placeholder="Enter your password"
                id="password"
                value={form.password}
                onChange={updateForm}
              />
            </div>
          </div>

          <div className="form-group text-center m-t-40">
            <div className="col-xs-12">
              <button
                onClick={submitForm}
                className="btn btn-primary btn-block btn-lg"
                type="submit"
              >
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
              <a href="pages-register.html" className="text-muted">
                Create an account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </LayoutAuth>
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
