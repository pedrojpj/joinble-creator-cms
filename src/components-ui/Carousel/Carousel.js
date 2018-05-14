import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, withHandlers, pure } from 'recompose';
import uuid from 'uuid';
import classnames from 'classnames';
import Slider from 'react-slick';

import { RefsStore } from '../../utils';
import CarouselItem from './CarouselItem';
import styles from './styles.css';

const styleButtonRight = classnames({
  [styles.button]: true,
  [styles.buttonRight]: true
});

const Carousel = ({ carouselItem, settings, refs, slickNext, slickPrev, className, vertical }) => (
  <div className={classnames({ [styles.carouselContainer]: true, [className]: className })}>
    <div className={classnames({ [styles.action]: true, [styles.actionTop]: vertical })}>
      <button type="button" className={styles.button} onClick={slickPrev}>
        <i
          className={classnames({ fas: true, 'fa-angle-left': !vertical, 'fa-angle-up': vertical })}
        />
      </button>
    </div>
    <Slider {...settings} ref={r => refs.store('slider', r)}>
      {carouselItem.map((item, i) => cloneElement(item, { key: uuid.v4() }))}
    </Slider>
    <div className={classnames({ [styles.actionRight]: true, [styles.actionBottom]: vertical })}>
      <button type="button" className={styleButtonRight} onClick={slickNext}>
        <i
          className={classnames({
            fas: true,
            'fa-angle-right': !vertical,
            'fa-angle-down': vertical
          })}
        />
      </button>
    </div>
  </div>
);

Carousel.propTypes = {
  carouselItem: PropTypes.arrayOf(PropTypes.node),
  settings: PropTypes.shape({}),
  refs: PropTypes.shape({}),
  slickNext: PropTypes.func,
  slickPrev: PropTypes.func,
  className: PropTypes.string,
  vertical: PropTypes.bool
};

export default compose(
  pure,
  withProps(({ children, vertical }) => ({
    carouselItem: children.filter(item => item.type === CarouselItem),
    refs: RefsStore,
    settings: {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: vertical ? true : false,
      verticalSwiping: vertical ? true : false
    }
  })),
  withHandlers({
    slickNext: ({ refs }) => () => {
      refs.get('slider').slickNext();
    },
    slickPrev: ({ refs }) => () => {
      refs.get('slider').slickPrev();
    }
  })
)(Carousel);
