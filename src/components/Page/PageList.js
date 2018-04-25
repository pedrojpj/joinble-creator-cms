import React from 'react';
import PropTypes from 'prop-types';

import { Title, Content, ButtonNew } from '../../components-ui';
import styles from './styles.css';

const PageList = ({ translations, router, pages, params }) => (
  <div>
    <Title>{translations.PAGES}</Title>
    <Content>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <ButtonNew text={translations.NEW_PAGE} link={`cms/app/${params.id}/pages/create`} />
        </div>
        {pages.map(page => <div />)}
      </div>
    </Content>
  </div>
);

PageList.propTypes = {
  translations: PropTypes.shape({}),
  router: PropTypes.shape({}),
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  params: PropTypes.shape({})
};

export default PageList;
