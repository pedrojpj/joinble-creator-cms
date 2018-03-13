import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps, withStateHandlers, lifecycle, withHandlers } from 'recompose';
import classnames from 'classnames';

import DialogMenu from './DialogMenu';
import { DialogModel } from './DialogModel';

class RefsStore {
  store(name, value) {
    this[name] = value;
  }
  get(name) {
    return this[name];
  }
}

export const Dialog = ({ items, children, open, toggleOpen, refs }) => {
  let stylesButton = classnames({
    dropdown: true,
    open: open
  });

  return (
    <div className={stylesButton} ref={r => refs.store('component', r)}>
      <span onClick={toggleOpen}>{children}</span>
      {open && items && <DialogMenu items={items} />}
    </div>
  );
};

Dialog.propTypes = {
  items: DialogModel.isRequired,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  toggleOpen: PropTypes.func
};

export default compose(
  withProps({ refs: new RefsStore() }),
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
