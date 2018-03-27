import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';

import { Alert, Input } from '../../components-ui';
import { HeaderAuth } from '../Header';

const Login = ({
  form,
  formError,
  formFieldsWithErrors,
  updateForm,
  submitForm,
  errorMessage,
  translations
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <HeaderAuth />
      <h4 className="text-muted text-center m-t-0">
        <b>{translations.SIGN_IN}</b>
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
          placeholder={translations.ENTER_YOUR_EMAIL}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('email')}
        />

        <Input
          type="password"
          name="password"
          autoComplete="off"
          placeholder={translations.ENTER_YOUR_PASSWORD}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('password')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button
              onClick={submitForm}
              className="btn btn-primary btn-block btn-lg"
              type="submit"
            >
              {translations.LOG_IN}
            </button>
          </div>
        </div>

        <div className="form-group m-t-30 m-b-0">
          <div className="col-sm-7">
            <Link
              to="/auth/forgotten-password"
              id="forgotten-password"
              className="text-muted"
            >
              <i className="fa fa-lock m-r-5" />{' '}
              {translations.FORGOT_YOUR_PASSWORD}
            </Link>
          </div>
          <div className="col-sm-5 text-right">
            <Link
              to="/auth/create-user"
              id="create-user"
              className="text-muted"
            >
              {translations.CREATE_AN_ACCOUNT}
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
  errorMessage: PropTypes.string,
  translations: PropTypes.shape({})
};

export default Login;
