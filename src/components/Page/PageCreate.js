import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Title, Content, Input, Alert, Toggle } from '../../components-ui';
import styles from './styles.css';

const PageCreate = ({
  mode,
  translations,
  form,
  formFieldsWithErrors,
  updateForm,
  submitForm,
  formError,
  errorMessage
}) => (
  <Fragment>
    <Title>{mode === 'create' ? translations.NEW_PAGE : translations.EDIT_PAGE}</Title>
    <Content>
      <form name="pages" className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12">
            {formError && <Alert type="danger">{errorMessage}</Alert>}
          </div>
        </div>
        <Input
          type="text"
          name="name"
          form={form}
          updateForm={updateForm}
          placeholder={translations.PAGE_NAME}
          error={formFieldsWithErrors.includes('name')}
        />

        <Input
          type="text"
          name="slug"
          form={form}
          updateForm={updateForm}
          placeholder={translations.PAGE_SLUG}
          error={formFieldsWithErrors.includes('slug')}
        />

        <div className="form-group">
          <div className="col-xs-12">
            <Toggle name="primary" value={form.primary} onChange={updateForm}>
              {translations.PAGE_PRIMARY}
            </Toggle>
          </div>
        </div>

        <div className={styles.formBottom}>
          <button type="button" className="btn btn-default" onClick={() => window.history.back()}>
            {translations.BACK}
          </button>

          <button type="submit" className="btn btn-info" onClick={submitForm}>
            {translations.SAVE}
          </button>
        </div>
      </form>
    </Content>
  </Fragment>
);

PageCreate.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  translations: PropTypes.shape({}),
  form: PropTypes.shape({
    name: PropTypes.string
  }),
  updateForm: PropTypes.func,
  formFieldsWithErrors: PropTypes.arrayOf(PropTypes.string),
  formError: PropTypes.bool,
  errorMessage: PropTypes.string
};

PageCreate.defaultProps = {
  mode: 'create'
};

export default PageCreate;
