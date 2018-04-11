import React, { cloneElement } from 'react';
import {
  compose,
  defaultProps,
  withHandlers,
  withProps,
  pure,
  withStateHandlers
} from 'recompose';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { RefsStore } from '../../utils';
import styles from './styles.css';

const updateValue = (originalValue, newValue, multiple) => {
  if (multiple) {
    if (originalValue.includes(newValue)) {
      return originalValue.filter(value => value !== newValue);
    } else {
      return originalValue.concat(newValue);
    }
  } else {
    return newValue;
  }
};

const originalValue = (value, multiple) => {
  if (value) {
    return value;
  } else {
    if (multiple) {
      return [];
    } else {
      return null;
    }
  }
};

export const Combo = ({
  children,
  onSelectItem,
  id,
  label,
  value,
  refs,
  checkSelected,
  error,
  errorMessage
}) => {
  const stylesCombo = classnames({
    [styles.combo]: true,
    [styles.comboError]: error
  });

  return (
    <div className="form-group">
      <div className="col-xs-12">
        <label>
          {label}
          <div
            role="listbox"
            tabIndex="0"
            id={id}
            className={stylesCombo}
            data-value={value}
            ref={r => refs.store('listbox', r)}
          >
            {React.Children.map(children, (child, i) =>
              cloneElement(child, {
                className: styles.comboItem,
                selected: checkSelected(child.props.value),
                onSelect: value => {
                  onSelectItem(value);
                }
              })
            )}
          </div>
        </label>
        {error && (
          <span className={styles.comboMessageError}>{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

Combo.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onSelectItem: PropTypes.func,
  label: PropTypes.string,
  refs: PropTypes.shape({}),
  multiple: PropTypes.bool,
  checkSelected: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default compose(
  withProps(({ value, multiple }) => ({
    value: originalValue(value, multiple),
    refs: RefsStore
  })),
  defaultProps({
    onChange: () => {},
    updateField: undefined
  }),
  withStateHandlers(({ value }) => ({ value }), {
    setValue: () => data => ({
      value: data
    })
  }),
  withHandlers({
    onSelectItem: ({
      setValue,
      onChange,
      refs,
      value,
      updateField,
      multiple,
      name
    }) => data => {
      const newValue = updateValue(value, data, multiple);
      setValue(newValue);
      onChange(newValue);

      if (updateField) {
        updateField(name, data);
      }
    },
    checkSelected: ({ value, multiple }) => itemValue => {
      if (multiple) {
        return value.includes(itemValue);
      } else {
        return value === itemValue;
      }
    }
  }),
  pure
)(Combo);
