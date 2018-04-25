import React from 'react';
import PropTypes from 'prop-types';

import { Title, Content, ButtonNew } from '../../components-ui';
import { AppItem } from '.';

export const AppList = ({ translations, apps, router, ...rest }) => (
  <div>
    <Title>{translations.APPLICATIONS}</Title>

    <Content>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <ButtonNew text={translations.NEW_APPLICATION} link="/cms/app/create" />
        </div>
        {apps.map(app => (
          <AppItem
            key={app.id}
            {...app}
            {...rest}
            translations={translations}
            onClick={() => router.push(`/cms/app/${app.id}/pages`)}
          />
        ))}
      </div>
    </Content>
  </div>
);

AppList.propTypes = {
  translations: PropTypes.shape({}),
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string
    })
  )
};
