import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withContext, withProps, withStateHandlers, withHandlers } from 'recompose';
import uuid from 'uuid/v4';
import anime from 'animejs';

import { Notification } from './Notification';
import { NotificationModel } from './NotificationModel';
import { RefsStore } from '../../utils';

import styles from './styles.css';

export const Notifications = ({ notifications, children, removeNotification, refs }) => (
  <Fragment>
    <div className={styles.notificationCenter} ref={r => refs.store('center', r)}>
      {notifications.map(notification => (
        <Notification key={notification.id} {...notification} onRemove={removeNotification} />
      ))}
    </div>
    {children}
  </Fragment>
);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(NotificationModel),
  children: PropTypes.node,
  removeNotification: PropTypes.func
};

export default compose(
  withProps({
    refs: RefsStore
  }),
  withHandlers({
    animationShow: ({ refs }) => () => {
      anime({
        targets: refs.get('center'),
        height: [0, 100],
        elasticity: 50
      });
    },
    animationHide: ({ refs }) => () => {
      anime({
        targets: refs.get('center'),
        height: [100, 0],
        elasticity: 50
      });
    }
  }),
  withStateHandlers(
    { notifications: [] },
    {
      addNotification: ({ notifications }, { animationShow }) => value => {
        animationShow();
        return {
          notifications: [...notifications, { ...value, id: uuid() }]
        };
      },
      removeNotification: ({ notifications }, { animationHide }) => id => {
        animationHide();
        return {
          notifications: notifications.filter(notification => notification.id !== id)
        };
      }
    }
  ),
  withContext({ addNotification: PropTypes.func }, ({ addNotification }) => ({
    addNotification: addNotification
  })),
  pure
)(Notifications);
