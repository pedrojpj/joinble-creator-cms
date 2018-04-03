import React from 'react';
import PropTypes from 'prop-types';

import { Input, DropImage } from '../../components-ui';

const Profile = ({ form, updateForm, submitForm, translations, countries }) => (
  <div>
    <div className="page-header-title">
      <h4 className="page-title">Profile</h4>
    </div>
    <div className="page-content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-ms-12">
            <div className="panel panel-primary">
              <div className="panel-body">
                <form className="form-horizontal">
                  <DropImage placeholder={translations.UPLOAD_AVATAR} name="avatar" />

                  <Input
                    type="text"
                    label={translations.NAME}
                    name="name"
                    form={form}
                    updateForm={updateForm}
                  />
                  <Input
                    type="email"
                    disabled
                    label="Email"
                    name="email"
                    form={form}
                    updateForm={updateForm}
                  />
                  <Input
                    type="text"
                    label={translations.ADDRESS}
                    name="address"
                    form={form}
                    updateForm={updateForm}
                  />

                  <div className="form-group">
                    <label className="col-sm-2 control-label">{translations.COUNTRY}</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        value={form.country}
                        name="country"
                        onChange={updateForm}
                      >
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
                    label={translations.CITY}
                    name="city"
                    form={form}
                    updateForm={updateForm}
                  />

                  <div className="form-group m-b-0">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-info" onClick={submitForm}>
                        {translations.SAVE}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string
  }),
  translations: PropTypes.shape({}),
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string
    })
  ),
  submitForm: PropTypes.func,
  updateForm: PropTypes.func
};

export default Profile;
