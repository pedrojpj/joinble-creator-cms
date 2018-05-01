import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TabContent = ({ children, active }) => {
  const stylesTab = classnames({
    'tab-pane': true,
    active: active
  });

  return <div className={stylesTab}>{children}</div>;
};

TabContent.propTypes = {
  active: PropTypes.bool
};

export default TabContent;
