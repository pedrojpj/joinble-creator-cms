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
  errorMessage
}) => (
  <div className="panel panel-color panel-primary panel-pages">
    <div className="panel-body">
      <h3 className="text-center m-t-0 m-b-15">logo</h3>
      <h4 className="text-muted text-center m-t-0">
        <b>Sign Up</b>
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
          placeholder="Enter your name"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('name')}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('email')}
        />
        <Input
          type="text"
          name="address"
          placeholder="Enter your address"
          form={form}
          updateForm={updateForm}
        />
        <div className="form-group">
          <div className="col-xs-12">
            <select className="form-control">
              <option value="" disabled selected>
                Select your country
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
          placeholder="Enter your city"
          form={form}
          updateForm={updateForm}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          form={form}
          updateForm={updateForm}
          error={formFieldsWithErrors.includes('password')}
        />

        <div className="form-group text-center m-t-40">
          <div className="col-xs-12">
            <button onClick={submitForm} className="btn btn-primary btn-block btn-lg" type="submit">
              Create User
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
  errorMessage: PropTypes.string
};

CreateUser.defaultProps = {
  formFieldsWithErrors: [],
  countries: []
};

export default CreateUser;
