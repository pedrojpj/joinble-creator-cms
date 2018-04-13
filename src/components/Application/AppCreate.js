import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  Content,
  Panel,
  Input,
  Combo,
  ComboItem,
  DropImage,
  Alert
} from '../../components-ui';

export const AppCreate = ({
  translations,
  form,
  formFieldsWithErrors,
  platforms,
  languages,
  updateForm,
  updateField,
  uploadImage,
  submitForm,
  formError,
  errorMessage
}) => (
  <div>
    <Title>{translations.NEW_APPLICATION}</Title>

    <Content>
      <Panel>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-12">
              {formError && <Alert type="danger">{errorMessage}</Alert>}
            </div>
          </div>

          <div className="form-group text-center">
            <DropImage
              placeholder={translations.UPLOAD_ICON}
              name="icon"
              mode="square"
              onChange={uploadImage}
            />
          </div>

          <Input
            type="text"
            name="name"
            form={form}
            updateForm={updateForm}
            placeholder={translations.APP_NAME}
            error={formFieldsWithErrors.includes('name')}
          />

          <Combo
            name="platforms"
            value={form.platforms}
            multiple
            label={translations.SELECT_PLATFORM}
            updateField={updateField}
            error={formFieldsWithErrors.includes('platforms')}
            errorMessage={translations.ERROR_PLATFORM}
          >
            {platforms.map(platform => (
              <ComboItem value={platform.code} key={platform.code}>
                {platform.name}
              </ComboItem>
            ))}
          </Combo>

          <Combo
            name="languages"
            value={form.languages}
            multiple
            label={translations.SELECT_LANGUAGE}
            updateField={updateField}
            error={formFieldsWithErrors.includes('languages')}
            errorMessage={translations.ERROR_LANGUAGE}
          >
            {languages.map(language => (
              <ComboItem value={language} key={language}>
                {language}
              </ComboItem>
            ))}
          </Combo>

          <Input
            type="text"
            name="domain"
            form={form}
            disabled={!form.platforms.includes('web')}
            updateForm={updateForm}
            placeholder={translations.APP_DOMAIN}
            error={formFieldsWithErrors.includes('domain')}
            errorMessage={translations.ERROR_DOMAIN}
          />

          <Input
            type="text"
            name="code"
            form={form}
            disabled={
              !form.platforms.includes('android') ||
              !form.platforms.includes('ios')
            }
            updateForm={updateForm}
            placeholder={translations.APP_CODE}
            error={formFieldsWithErrors.includes('code')}
            errorMessage={translations.ERROR_CODE}
          />

          <div className="form-group m-b-0">
            <div className="col-sm-offset-2 col-sm-10">
              <button
                type="submit"
                className="btn btn-info"
                onClick={submitForm}
              >
                {translations.SAVE}
              </button>
            </div>
          </div>
        </form>
      </Panel>
    </Content>
  </div>
);

AppCreate.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.string),
    languages: PropTypes.arrayOf(PropTypes.string),
    domain: PropTypes.string
  }),
  translations: PropTypes.shape({}),
  updateForm: PropTypes.func,
  uploadImage: PropTypes.func,
  updateField: PropTypes.func,
  submitForm: PropTypes.func
};
