import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const CarouselItem = ({ children, className, draggable, onDragStart, onDragEnd }) => {
  const stylesItem = classnames({
    [className]: className,
    [styles.carouselItem]: true
  });
  return (
    <div
      className={stylesItem}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
};

CarouselItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  draggable: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default CarouselItem;
