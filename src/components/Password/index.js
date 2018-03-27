import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Input } from '../../components-ui';
import { HeaderAuth } from '../Header';

const Password = ({
  formError,
  errorMessage,
  advice,
  adviceMessage,
  hideAdvice,
  form,
  updateForm,
  formFieldsWithErrors,
  submitForm,
  translations,
  router
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <HeaderAuth back onBack={() => router.push('/auth/login')} />
      <h4 className="text-muted text-center m-t-0">
        <b>{translations.RESET_PASSWORD}</b>
      </h4>

      <form className="form-horizontal m-t-20" name="password">
        <div className="form-group">
          <div className="col-xs-12">
            {!formError &&
              advice && (
                <Alert type="info" onClose={hideAdvice}>
                  {adviceMessage}
                </Alert>
              )}
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

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button
              onClick={submitForm}
              className="btn btn-primary btn-block btn-lg"
              type="submit"
            >
              {translations.RECOVER_PASSWORD}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

Password.propTypes = {
  advice: PropTypes.bool,
  adviceMessage: PropTypes.string,
  hideAdvice: PropTypes.func,
  errorMessage: PropTypes.string,
  formError: PropTypes.bool,
  form: PropTypes.shape({
    password: PropTypes.string
  }),
  updateForm: PropTypes.func,
  formFieldsWithErrors: PropTypes.arrayOf(PropTypes.string),
  submitForm: PropTypes.func
};

Password.defaultProps = {
  formFieldsWithErrors: [],
  translations: {}
};

export default Password;
