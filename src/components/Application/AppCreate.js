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
import { ICONS, ICONS_LANGUAGE } from '../../constants';

import styles from './styles.css';

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
  errorMessage,
  icon,
  router,
  mode,
  checkEnableCode
}) => (
  <div>
    <Title>{mode === 'create' ? translations.NEW_APPLICATION : translations.EDIT_APP}</Title>

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
              files={icon}
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
            id="combo-platforms"
            value={form.platforms}
            multiple
            label={translations.SELECT_PLATFORM}
            updateField={updateField}
            error={formFieldsWithErrors.includes('platforms')}
            errorMessage={translations.ERROR_PLATFORM}
          >
            {platforms.map(platform => (
              <ComboItem value={platform.code} key={platform.code} tooltip={platform.name}>
                <i class={`fab fa-${ICONS[platform.code]}`} />
              </ComboItem>
            ))}
          </Combo>

          <Combo
            name="languages"
            value={form.languages}
            multiple
            id="combo-languages"
            label={translations.SELECT_LANGUAGE}
            updateField={updateField}
            error={formFieldsWithErrors.includes('languages')}
            errorMessage={translations.ERROR_LANGUAGE}
          >
            {languages.map(language => (
              <ComboItem value={language} key={language} tooltip={translations.LANGUAGES[language]}>
                <span className={`flag-icon flag-icon-${ICONS_LANGUAGE[language]}`} />
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
            disabled={checkEnableCode() ? true : false}
            updateForm={updateForm}
            placeholder={translations.APP_CODE}
            error={formFieldsWithErrors.includes('code')}
            errorMessage={translations.ERROR_CODE}
          />

          <div className={styles.appBarBottom}>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => router.push('/cms/app/list')}
            >
              {translations.BACK}
            </button>

            <button type="submit" className="btn btn-info" id="button-save" onClick={submitForm}>
              {translations.SAVE}
            </button>
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
  submitForm: PropTypes.func,
  icon: PropTypes.arrayOf(PropTypes.shape({})),
  mode: PropTypes.oneOf(['create', 'edit']),
  checkEnableCode: PropTypes.func
};

AppCreate.defaultProps = {
  icon: [],
  mode: 'create'
};
