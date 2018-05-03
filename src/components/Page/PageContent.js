import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, CarouselItem } from '../../components-ui';
import styles from './styles.css';

const PageContent = ({ widgets }) => (
  <div className={styles.widgetContainer}>
    <Carousel>
      {widgets.map(widget => (
        <CarouselItem key={widget.name} className={styles.widgetContent}>
          <h4>{widget.name}</h4>
          <i className={widget.icon} />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
);

PageContent.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  )
};

export default PageContent;
