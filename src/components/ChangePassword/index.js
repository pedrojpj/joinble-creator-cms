import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Input } from '../../components-ui';
import { HeaderAuth } from '../Header';

const ChangePassword = ({
  formError,
  errorMessage,
  advice,
  adviceMessage,
  hideAdvice,
  form,
  updateForm,
  formFieldsWithErrors,
  submitForm,
  translations
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <HeaderAuth />
      <h4 className="text-muted text-center m-t-0">
        <b>{translations.CHANGE_PASSWORD}</b>
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
          type="password"
          name="newPassword"
          autoComplete="off"
          placeholder={translations.ENTER_YOUR_NEW_PASSWORD}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('newPassword')}
        />

        <Input
          type="password"
          name="repeatNewPassword"
          autoComplete="off"
          placeholder={translations.REPEAT_YOUR_NEW_PASSWORD}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('repeatNewPassword')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button
              onClick={submitForm}
              className="btn btn-primary btn-block btn-lg"
              type="submit"
            >
              {translations.CHANGE_PASSWORD}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

ChangePassword.propTypes = {
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
  submitForm: PropTypes.func,
  translations: PropTypes.shape({})
};

ChangePassword.defaultProps = {
  formFieldsWithErrors: [],
  translations: {}
};

export default ChangePassword;
