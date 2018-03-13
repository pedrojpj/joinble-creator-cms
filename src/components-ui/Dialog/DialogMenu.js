import React, { Fragment } from 'react';
import { compose, pure } from 'recompose';
import uuid from 'uuid/v4';

import { withAnimation } from '../../hoc';
import { DialogModel } from './DialogModel';

const DialogMenu = ({ items }) => {
  return (
    <ul className="dropdown-menu" style={{ display: 'block' }}>
      {items.map(item => (
        <Fragment key={uuid()}>
          {item.separator && <li className="divider" />}
          <li>
            <a href="javascript:void(0)" onClick={item.onClick}>
              {item.name}
            </a>
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

DialogMenu.propTypes = {
  items: DialogModel
};

export default compose(
  withAnimation({
    translateY: '1em',
    borderRadius: ['0px', '4px'],
    easing: 'easeOutElastic',
    elasticity: function(target, index, totalTargets) {
      return 200 + (totalTargets - index) * 200;
    }
  }),
  pure
)(DialogMenu);
