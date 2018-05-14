import React from 'react';
import PropTypes from 'prop-types';

import { Carousel, CarouselItem } from '../../components-ui';
import { WidgetItem, WidgetContainer } from '../Widget';
import styles from './styles.css';

const PageContent = ({ widgets, onDragWidget, onDropWidget, state, removeWidget, ...rest }) => (
  <div className={styles.contentContainer}>
    <div className={styles.widgetContainer}>
      <Carousel vertical>
        {widgets.map(widget => (
          <CarouselItem
            key={widget.name}
            className={styles.widgetContent}
            draggable
            onDragStart={event => onDragWidget(event, widget)}
          >
            <h4>{widget.name}</h4>
            <i className={widget.icon} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>

    <div className={styles.content}>
      <div
        className={styles.body}
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDropWidget(e)}
      >
        <WidgetContainer>
          {state.widgets.map((widget, index) => (
            <WidgetItem
              key={widget.id}
              {...widget}
              index={index}
              {...rest}
              onDelete={removeWidget}
            />
          ))}
        </WidgetContainer>
      </div>
    </div>
  </div>
);

PageContent.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, description: PropTypes.string })
  ),
  onDragWidget: PropTypes.func,
  state: PropTypes.shape({
    widget: PropTypes.shape({})
  }),
  removeWidget: PropTypes.func
};

export default PageContent;
