import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps, withStateHandlers, lifecycle, withHandlers } from 'recompose';
import classnames from 'classnames';

import { RefsStore } from '../../utils';
import DialogMenu from './DialogMenu';
import { DialogModel } from './DialogModel';

export const Dialog = ({ items, children, className, open, toggleOpen, refs, position }) => {
  let stylesButton = classnames({
    dropdown: true,
    open: open,
    [className]: className
  });

  return (
    <div className={stylesButton} ref={r => refs.store('component', r)}>
      {cloneElement(children, { onClick: toggleOpen })}
      {open && items && <DialogMenu items={items} onClickItem={toggleOpen} position={position} />}
    </div>
  );
};

Dialog.propTypes = {
  items: DialogModel.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
  className: PropTypes.string,
  position: PropTypes.oneOf(['left', 'right'])
};

Dialog.defaultProps = {
  position: 'left'
};

export default compose(
  withProps({ refs: RefsStore }),
  withStateHandlers({ open: false }, { toggleOpen: ({ open }) => () => ({ open: !open }) }),
  withHandlers({
    clickOutside: ({ refs, open, toggleOpen }) => event => {
      if (refs.get('component') && !refs.get('component').contains(event.target)) {
        if (open) {
          toggleOpen();
        }
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('mousedown', this.props.clickOutside);
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.clickOutside);
    }
  }),
  pure
)(Dialog);
