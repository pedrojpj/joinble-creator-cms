import React from 'react';
import PropTypes from 'prop-types';
import { EntypoPlus } from 'react-entypo';
import { compose, pure } from 'recompose';
import { withRouter } from 'found';

import styles from './styles.css';

const ButtonNew = ({ text, link, router, id }) => (
  <button id={id} className={styles.buttonNew} onClick={() => router.push(link)}>
    <span>
      <EntypoPlus />
    </span>

    {text}
  </button>
);

ButtonNew.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  router: PropTypes.shape({}),
  id: PropTypes.string
};

export default compose(withRouter, pure)(ButtonNew);
