import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const CarouselItem = ({ children, className }) => {
  const stylesItem = classnames({
    [className]: className,
    [styles.carouselItem]: true
  });
  return <div className={stylesItem}>{children}</div>;
};

CarouselItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default CarouselItem;
