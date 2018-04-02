import React, { Fragment } from 'react';
import { compose, pure } from 'recompose';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

import withAnimation from '../../hoc/withAnimation';
import { DialogModel } from './DialogModel';

const DialogMenu = ({ items, onClickItem, position }) => {
  let stylesDialog = {
    display: 'block'
  };

  if (position === 'left') {
    stylesDialog.left = 0;
  } else {
    stylesDialog.left = 'inherit';
    stylesDialog.right = 0;
  }

  return (
    <ul className="dropdown-menu" style={stylesDialog}>
      {items.map(item => (
        <Fragment key={uuid()}>
          {item.separator && <li className="divider" />}
          <li id={item.id}>
            <a
              href="javascript:void(0)"
              onClick={() => {
                onClickItem();
                item.onClick();
              }}
            >
              {item.name}
            </a>
          </li>
        </Fragment>
      ))}
    </ul>
  );
};

DialogMenu.propTypes = {
  items: DialogModel,
  onClickItem: PropTypes.func,
  position: PropTypes.string
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
