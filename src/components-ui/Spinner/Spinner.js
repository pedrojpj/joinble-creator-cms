import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps } from 'recompose';

import styles from './styles.css';

const Spinner = ({ scale }) => (
  <div className={styles.spinner} style={{ transform: `scale(${scale()})` }}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  scale: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
};

Spinner.defaultProps = {
  size: 'medium'
};

export default compose(
  withProps(({ size }) => ({
    scale: () => {
      if (size === 'medium') {
        return 1;
      }
      if (size === 'large') {
        return 1.5;
      }
      if (size === 'small') {
        return 0.5;
      }
    }
  })),
  pure
)(Spinner);
