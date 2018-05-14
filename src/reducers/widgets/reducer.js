import { ADD, REMOVE } from './actionTypes';

import { loggerReducer } from '../../utils';

export const initialState = {
  widgets: []
};

export const reducer = (state = initialState, action) => {
  const { type, widget, id } = action;

  loggerReducer(action, state);

  switch (type) {
    case ADD:
      return {
        ...state,
        widgets: [...state.widgets, widget]
      };
    case REMOVE:
      return {
        ...state,
        widgets: state.widgets.filter(item => item.id !== id)
      };

    default:
      return state;
  }
};
