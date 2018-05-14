import React, { Fragment, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { withStateHandlers, withProps, compose, pure, lifecycle, withHandlers } from 'recompose';
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

const Select = ({
  label,
  value,
  show,
  toggleShow,
  options,
  refs,
  stylesContainer,
  onClickOption,
  showValue,
  values,
  multiple,
  id
}) => (
  <Fragment>
    <div
      className={cn({ [styles.select]: true, [styles.selectActive]: show })}
      onClick={toggleShow}
      ref={r => refs.store(`select-${id}`, r)}
    >
      {!showValue() ? label : showValue()} <span className={styles.selectArrow} />
    </div>
    {show &&
      createPortal(
        <div className={styles.selectContent} style={stylesContainer}>
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
  withProps(({ children }) => ({
    options: children.filter(item => item.type === Option),
    refs: RefsStore,
    id: uuid.v4()
  })),
  lifecycle({
    componentDidMount() {
      selectRoot.appendChild(el);
    },
    componentWillUnmount() {
      selectRoot.removeChild(el);
    }
  }),
  withStateHandlers(
    ({ value, values }) => ({
      show: false,
      stylesContainer: {},
      value: value || null,
      values: values || []
    }),
    {
      toggleShow: ({ show }, { refs, id }) => () => {
        const { width, top, left, height } = refs.get(`select-${id}`).getBoundingClientRect();
        return { show: !show, stylesContainer: { width, top: top + height, left } };
      },
      addValue: () => value => ({
        value: value
      }),
      addValues: ({ values }) => value => ({
        values: values.includes(value) ? values.filter(v => v !== value) : [...values, value]
      })
    }
  ),
  withHandlers({
    onClickOption: ({ toggleShow, addValue, addValues, multiple }) => value => {
      if (multiple) {
        addValues(value);
      } else {
        addValue(value);
        toggleShow();
      }
    },
    showValue: ({ values, value, multiple }) => () => {
      if (multiple) {
        return values.join(',');
      } else {
        return value;
      }
    }
  }),
  pure
)(Select);
