import React, { cloneElement, Fragment } from 'react';
import { compose, withProps, withHandlers, pure, withStateHandlers, lifecycle } from 'recompose';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import anime from 'animejs';

import Tab from './Tab';
import TabContent from './TabContent';
import styles from './styles.css';
import { RefsStore } from '../../utils';

let animation;
const height = 160;

const Tabs = ({ tabContent, tabItem, onClickTab, activeTab, refs }) => (
  <Fragment>
    <ul className="nav nav-tabs navtab-bg">
      {tabItem.map((item, i) =>
        cloneElement(item, {
          key: uuid.v4(),
          onClick: () => onClickTab(i),
          active: i === activeTab ? true : false
        })
      )}
    </ul>
    <div className={styles.tabRippleContent}>
      <span className={styles.tabRipple} ref={r => refs.store('ripple', r)} />
    </div>
    <div className="tab-content">
      {tabContent.map((item, i) =>
        cloneElement(item, { key: uuid.v4(), active: i === activeTab ? true : false })
      )}
    </div>
  </Fragment>
);

Tabs.propTypes = {
  tabItem: PropTypes.node,
  tabContent: PropTypes.node,
  onClickTab: PropTypes.func,
  activeTab: PropTypes.number
};

export default compose(
  withStateHandlers(({ activeTab }) => ({ activeTab: activeTab || 0 }), {
    setActiveTab: () => index => ({ activeTab: index })
  }),
  withProps(({ children }) => ({
    tabItem: children.filter(item => item.type === Tab),
    tabContent: children.filter(item => item.type === TabContent),
    refs: RefsStore
  })),
  lifecycle({
    componentDidMount() {
      animation = anime({
        targets: this.props.refs.get('ripple'),
        translateX: height * this.props.activeTab,
        elasticity: 50
      });
    }
  }),
  withHandlers({
    onClickTab: ({ setActiveTab, refs }) => index => {
      setActiveTab(index);

      if (animation) {
        animation.pause();
      }
      animation = anime({
        targets: refs.get('ripple'),
        translateX: height * index,
        elasticity: 50
      });
    }
  }),
  pure
)(Tabs);
