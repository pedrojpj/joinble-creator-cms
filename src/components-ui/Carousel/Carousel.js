import React, { cloneElement } from 'react';
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

const Carousel = ({ carouselItem, settings, refs, slickNext, slickPrev }) => (
  <div className={styles.carouselContainer}>
    <div className={styles.action}>
      <button type="button" className={styles.button} onClick={slickPrev}>
        <i class="fas fa-angle-left" />
      </button>
    </div>
    <Slider {...settings} ref={r => refs.store('slider', r)}>
      {carouselItem.map((item, i) => cloneElement(item, { key: uuid.v4() }))}
    </Slider>
    <div className={styles.actionRight}>
      <button type="button" className={styleButtonRight} onClick={slickNext}>
        <i class="fas fa-angle-right" />
      </button>
    </div>
  </div>
);

export default compose(
  pure,
  withProps(({ children }) => ({
    carouselItem: children.filter(item => item.type === CarouselItem),
    refs: RefsStore,
    settings: {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
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
