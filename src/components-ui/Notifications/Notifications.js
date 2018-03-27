import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  pure,
  withContext,
  withProps,
  withStateHandlers,
  withHandlers
} from 'recompose';
import uuid from 'uuid/v4';
import anime from 'animejs';

import { Notification } from './Notification';
import { NotificationModel } from './NotificationModel';
import { RefsStore } from '../../utils';

import styles from './styles.css';

export const Notifications = ({
  notifications,
  children,
  removeNotification,
  refs
}) => (
  <Fragment>
    <div
      className={styles.notificationCenter}
      ref={r => refs.store('center', r)}
    >
      <div className={styles.container}>
        {notifications
          .filter(notification => notification.primary)
          .map(notification => (
            <Notification
              key={notification.id}
              {...notification}
              onRemove={removeNotification}
            />
          ))}
      </div>
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
        translateX: [500, 0],
        elasticity: 50
      });
    },
    animationHide: ({ refs }) => () =>
      new Promise((resolve, reject) => {
        anime({
          targets: refs.get('center'),
          translateX: [0, 500],
          elasticity: 50,
          complete: () => {
            resolve(true);
          }
        });
      })
  }),
  withStateHandlers(
    { notifications: [] },
    {
      addNotification: ({ notifications }, { animationShow }) => value => {
        animationShow();

        const newNotifications = notifications.map(
          notification =>
            notification.primary
              ? { ...notification, primary: false }
              : notification
        );

        return {
          notifications: [
            ...newNotifications,
            { ...value, id: uuid(), primary: true }
          ]
        };
      },
      deleteNotification: ({ notifications }) => id => ({
        notifications: notifications.filter(
          notification => notification.id !== id
        )
      })
    }
  ),
  withHandlers({
    insertNotification: ({ addNotification, deleteNotification }) => (
      notification,
      time
    ) => {
      addNotification(notification);

      if (time) {
        setTimeout(() => {
          deleteNotification(notification);
        }, 3000);
      }
    },
    removeNotification: ({ deleteNotification, animationHide }) => id => {
      animationHide().then(() => deleteNotification(id));
    }
  }),
  withContext(
    { addNotification: PropTypes.func },
    ({ insertNotification }) => ({
      addNotification: insertNotification
    })
  ),
  pure
)(Notifications);
