import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  pure,
  lifecycle,
  withStateHandlers,
  branch,
  renderComponent
} from 'recompose';
import notFound from '../../assets/images/noFound.png';

export const ImageComponent = ({ src, alt, load }) =>
  load && <img src={src} alt={alt} />;

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  load: PropTypes.bool
};

export const ImageNotFound = () => <img src={notFound} alt="not-found" />;

export default compose(
  withStateHandlers(
    { load: false, error: false },
    {
      isLoad: () => () => ({ load: true }),
      isError: () => () => ({ error: true })
    }
  ),
  branch(({ error }) => error, renderComponent(ImageNotFound)),
  lifecycle({
    componentDidMount() {
      if (this.props.src) {
        let image = new Image();
        image.src = this.props.src;

        image.addEventListener(
          'load',
          () => {
            this.props.isLoad();
          },
          false
        );

        image.addEventListener('error', () => {
          this.props.isError();
        });
      } else {
        this.props.isError();
      }
    }
  }),
  pure
)(ImageComponent);
