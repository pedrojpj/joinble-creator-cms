import React, { cloneElement } from 'react';
import { compose, defaultProps, withHandlers, withProps, pure, withStateHandlers } from 'recompose';
import PropTypes from 'prop-types';

import { RefsStore } from '../../utils';
import styles from './styles.css';

export const Combo = ({ children, onSelectItem, id, label, value, refs }) => (
  <label>
    {label}
    <div
      role="listbox"
      tabIndex="0"
      id={id}
      className={styles.combo}
      data-value={value}
      ref={r => refs.store('listbox', r)}
    >
      {React.Children.map(children, (child, i) =>
        cloneElement(child, {
          className: styles.comboItem,
          selected: value === child.props.value,
          onSelect: value => {
            onSelectItem(value);
          }
        })
      )}
    </div>
  </label>
);

Combo.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onSelectItem: PropTypes.func,
  label: PropTypes.string,
  refs: PropTypes.shape({})
};

export default compose(
  withProps({
    refs: RefsStore
  }),
  defaultProps({
    onChange: () => {}
  }),
  withStateHandlers(({ value }) => ({ value }), { setValue: () => value => ({ value: value }) }),
  withHandlers({
    onSelectItem: ({ setValue, onChange, refs }) => value => {
      setValue(value);
      onChange(value);
      console.log(refs.get('listbox'));

      var event = new CustomEvent('change', { target: refs.get('listbox') });

      console.log(event);
    }
  }),
  pure
)(Combo);
