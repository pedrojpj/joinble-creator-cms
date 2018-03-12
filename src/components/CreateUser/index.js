import React from 'react';
import PropTypes from 'prop-types';
import { Input, Alert } from '../../components-ui';

const CreateUser = ({
  form,
  formError,
  updateForm,
  submitForm,
  countries,
  formFieldsWithErrors,
  errorMessage,
  translations
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <h3 className="text-center m-t-0 m-b-15">logo</h3>
      <h4 className="text-muted text-center m-t-0">
        <b>{translations.SIGN_UP}</b>
      </h4>

      <form className="form-horizontal m-t-20" name="createUser">
        <div className="form-group">
          <div className="col-xs-12">
            {formError && <Alert type="danger">{errorMessage}</Alert>}
          </div>
        </div>

        <Input
          type="text"
          name="name"
          placeholder={translations.ENTER_YOUR_NAME}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('name')}
        />
        <Input
          type="email"
          name="email"
          placeholder={translations.ENTER_YOUR_EMAIL}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('email')}
        />
        <Input
          type="text"
          name="address"
          placeholder={translations.ENTER_YOUR_ADDRESS}
          form={form}
          updateForm={updateForm}
        />
        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control" value={form.country}>
              <option value="" disabled>
                {translations.SELECT_YOUR_COUNTRY}
              </option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Input
          type="text"
          name="city"
          placeholder={translations.ENTER_YOUR_CITY}
          form={form}
          updateForm={updateForm}
        />
        <Input
          type="password"
          name="password"
          placeholder={translations.ENTER_YOUR_PASSWORD}
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('password')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button onClick={submitForm} className="btn btn-primary btn-block btn-lg" type="submit">
              {translations.CREATE_USER}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

CreateUser.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    password: PropTypes.password
  }),
  updateForm: PropTypes.func,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string
    })
  ),
  submitForm: PropTypes.func,
  formError: PropTypes.bool,
  formFieldsWithErrors: PropTypes.arrayOf(PropTypes.string),
  errorMessage: PropTypes.string,
  translations: PropTypes.shape({})
};

CreateUser.defaultProps = {
  formFieldsWithErrors: [],
  form: {
    country: ''
  },
  countries: [],
  translations: {}
};

export default CreateUser;
