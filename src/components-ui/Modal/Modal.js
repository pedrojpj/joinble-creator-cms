import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, pure, lifecycle, withHandlers } from 'recompose';
import anime from 'animejs';

import { RefsStore } from '../../utils';

export const Modal = ({ id, title, text, onCloseAnimation, refs }) => (
  <div
    id={id}
    className="modal"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
    ref={r => refs.store('container', r)}
    style={{ display: 'block' }}
  >
    <div className="modal-dialog">
      <div className="modal-content" ref={r => refs.store('dialog', r)}>
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={onCloseAnimation}
          >
            ×
          </button>
          {title && <h4 className="modal-title">{title}</h4>}
        </div>
        <div className="modal-body">{text && <p dangerouslySetInnerHTML={{ __html: text }} />}</div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  onCloseAnimation: PropTypes.func
};

export default compose(
  withProps({
    refs: RefsStore
  }),
  withHandlers({
    onCloseAnimation: ({ refs, onClose }) => () => {
      const timeLine = anime.timeline({
        complete: () => {
          onClose();
        }
      });

      timeLine
        .add({
          targets: refs.get('dialog'),
          scale: [1, 0],
          opacity: [1, 0],
          elasticity: 100,
          duration: 500
        })
        .add({
          targets: refs.get('container'),
          opacity: [1, 0],
          duration: 200
        });
    }
  }),
  withHandlers({
    clickOutside: ({ refs, onCloseAnimation }) => event => {
      if (refs.get('dialog') && !refs.get('dialog').contains(event.target)) {
        onCloseAnimation();
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      const timeLine = anime.timeline();
      document.addEventListener('mousedown', this.props.clickOutside);

      timeLine
        .add({
          targets: this.props.refs.get('container'),
          opacity: [0, 1],
          duration: 200
        })
        .add({
          targets: this.props.refs.get('dialog'),
          scale: [0, 1],
          borderRadius: [0, 8],
          elasticity: 100,
          duration: 500
        });
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.clickOutside);
    }
  }),
  pure
)(Modal);
