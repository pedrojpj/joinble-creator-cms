import uuid from 'uuid';

import { ADD, REMOVE } from './actionTypes';

export const addWidget = (dispatch, state) => widget => {
  const currentWidget = state.widgets.find(
    item => item.selector === widget.selector && !item.repeat
  );

  if (!currentWidget) {
    dispatch({ type: ADD, widget: { ...widget, id: uuid.v4() } });
  }
};

export const removeWidget = dispatch => id => {
  dispatch({ type: REMOVE, id });
};
