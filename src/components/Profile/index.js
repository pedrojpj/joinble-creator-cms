import React from 'react';
import PropTypes from 'prop-types';

import { Input, DropImage, Title, Content, Panel } from '../../components-ui';

const Profile = ({ form, updateForm, uploadImage, submitForm, translations, countries, user }) => (
  <div>
    <Title>{translations.PROFILE}</Title>
    <Content>
      <Panel>
        <form className="form-horizontal">
          <div className="form-group text-center">
            <DropImage
              placeholder={translations.UPLOAD_AVATAR}
              name="avatar"
              files={user.avatar.image ? [user.avatar] : []}
              onChange={uploadImage}
            />
          </div>

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
            <label className="col-md-2 control-label">{translations.COUNTRY}</label>
            <div className="col-md-10">
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
      </Panel>
    </Content>
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
  updateForm: PropTypes.func,
  uploadImage: PropTypes.func
};

export default Profile;
