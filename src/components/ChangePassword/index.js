import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Input } from '../../components-ui';

const ChangePassword = ({
  formError,
  errorMessage,
  advice,
  adviceMessage,
  hideAdvice,
  form,
  updateForm,
  formFieldsWithErrors,
  submitForm
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <h3 className="text-center m-t-0 m-b-15">logo</h3>
      <h4 className="text-muted text-center m-t-0">
        <b>Change Password</b>
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
          placeholder="Enter your new password"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('newPassword')}
        />

        <Input
          type="password"
          name="repeatNewPassword"
          autoComplete="off"
          placeholder="Repeat your new password"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('repeatNewPassword')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button onClick={submitForm} className="btn btn-primary btn-block btn-lg" type="submit">
              Change Password
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
  submitForm: PropTypes.func
};

ChangePassword.defaultProps = {
  formFieldsWithErrors: []
};

export default ChangePassword;
