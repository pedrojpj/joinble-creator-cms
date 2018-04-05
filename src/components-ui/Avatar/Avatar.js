import React from 'react';
import { compose, withProps, pure } from 'recompose';

import styles from './style.css';

const getInitials = function(string) {
  const names = string.split(' ');
  let initials = [];
  names.map(item => initials.push(item.substring(0, 1).toUpperCase()));
  return initials.join('');
};

export const Avatar = ({ img, name, initials }) => (
  <div className={styles.avatar}>
    {img ? <img src={img} alt={name} /> : <span className={styles.avatarInitials}>{initials}</span>}
  </div>
);

export default compose(withProps(({ name }) => ({ initials: getInitials(name) })), pure)(Avatar);
