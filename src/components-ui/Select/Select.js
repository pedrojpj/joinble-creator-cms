import React, { Fragment, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import {
  withStateHandlers,
  withProps,
  compose,
  pure,
  lifecycle,
  withHandlers,
  defaultProps,
  setDisplayName
} from 'recompose';
import uuid from 'uuid';
import cn from 'classnames';
import { RefsStore } from '../../utils';

import Option from './Option';
import styles from './styles.css';

if (!document.getElementById('select')) {
  const selectDiv = document.createElement('div');
  selectDiv.setAttribute('id', 'select');
  document.body.appendChild(selectDiv);
}

const selectRoot = document.getElementById('select');
const el = document.createElement('div');

export const Select = ({
  label,
  value,
  show,
  toggleShow,
  options,
  refs,
  removeValue,
  stylesContainer,
  onClickOption,
  showValue,
  values,
  multiple,
  id,
  optionsSelected
}) => (
  <Fragment>
    <div
      className={cn({ [styles.select]: true, [styles.selectActive]: show })}
      onClick={toggleShow}
      ref={r => refs.store(`select-${id}`, r)}
    >
      {!showValue() ? label : showValue()} <span className={styles.selectArrow} />
    </div>
    {values && (
      <ul className={styles.selectList}>
        {optionsSelected.map(option => (
          <li key={option.props.value}>
            <span>{option.props.children}</span>
            <button onClick={() => removeValue(option.props.value)}>x</button>
          </li>
        ))}
      </ul>
    )}
    {show &&
      createPortal(
        <div
          className={styles.selectContent}
          ref={r => refs.store(`select-menu-${id}`, r)}
          style={stylesContainer}
        >
          {options.map((item, i) =>
            cloneElement(item, {
              key: uuid.v4(),
              onClick: onClickOption,
              selected: multiple ? values.includes(item.props.value) : item.props.value === value
            })
          )}
        </div>,
        el
      )}
  </Fragment>
);

export default compose(
  setDisplayName('SelectComponent'),
  defaultProps({
    onChange: () => {}
  }),
  withProps(({ children }) => ({
    options: children ? children.filter(item => item.type === Option) : [],
    refs: RefsStore,
    id: uuid.v4()
  })),
  withStateHandlers(
    ({ value, values, options }) => ({
      show: false,
      stylesContainer: {},
      value: value || null,
      values: values || [],
      optionsSelected: values ? options.filter(option => values.includes(option.props.value)) : []
    }),
    {
      toggleShow: ({ show }, { refs, id }) => () => {
        const { width, top, left, height } = refs.get(`select-${id}`).getBoundingClientRect();

        return { show: !show, stylesContainer: { width, top: top + height, left } };
      },
      closeShow: () => () => ({
        show: false
      }),
      addValue: () => value => ({
        value
      }),
      addValues: ({ values }, { onChange, name, options }) => value => {
        const newValues = values.includes(value)
          ? values.filter(v => v !== value)
          : [...values, value];

        const optionsSelected = options.filter(option => newValues.includes(option.props.value));

        onChange(name, value);
        return {
          values: newValues,
          optionsSelected
        };
      },
      removeValue: ({ values }, { onChange, name, options }) => value => {
        const newValues = values.filter(item => item !== value);
        const optionsSelected = options.filter(option => newValues.includes(option.props.value));

        onChange(name, value);
        return {
          values: values.filter(item => item !== value),
          optionsSelected
        };
      }
    }
  ),
  withHandlers({
    clickOutside: ({ refs, show, closeShow, id }) => event => {
      if (refs.get(`select-${id}`) === event.target) {
        return false;
      }

      if (refs.get(`select-menu-${id}`) && !refs.get(`select-menu-${id}`).contains(event.target)) {
        if (show) {
          closeShow();
        }
      }
    },
    onClickOption: ({ closeShow, addValue, name, addValues, onChange, multiple }) => value => {
      if (multiple) {
        addValues(value);
      } else {
        addValue(value);
        onChange(name, value);
        closeShow();
      }
    },
    showValue: ({ optionsSelected, value, multiple }) => () => {
      if (multiple) {
        return optionsSelected.map(option => option.props.children).join(',');
      } else {
        return value;
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      selectRoot.appendChild(el);
      document.addEventListener('mousedown', this.props.clickOutside);
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.clickOutside);
    }
  }),
  pure
)(Select);
