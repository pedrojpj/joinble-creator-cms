import React from 'react';
import PropTypes from 'prop-types';

import { Title, Content, Panel, Input } from '../../components-ui';

export const AppCreate = ({ translations, form, updateForm }) => (
  <div>
    <Title>{translations.NEW_APPLICATION}</Title>

    <Content>
      <Panel>
        <Input
          type="text"
          name="name"
          form={form}
          updateForm={updateForm}
          placeholder={translations.APP_NAME}
        />
      </Panel>
    </Content>
  </div>
);

AppCreate.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string
  }),
  translations: PropTypes.shape({})
};
