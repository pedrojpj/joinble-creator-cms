export const loggerReducer = (action, state) => {
  if (process.env.NODE_ENV === 'development') {
    const { type, ...rest } = action;
    console.log(`%c prev state: `, 'color: grey; font-weight: bold;', state);
    console.log(`%c actionType:`, 'color: green; font-weight: bold;', type);
    console.log(
      `%c state with new payload: `,
      'color: blue; font-weight: bold;',
      Object.assign({}, state, rest)
    );
  }
};

export const logger = (message, type) => {
  if (process.env.NODE_ENV === 'development') {
    switch (type) {
      case 'warn': {
        console.warn(`%c ${message}`, 'color: red');
        break;
      }
      default: {
        console.log(`%c ${message}`, 'color: blue');
        break;
      }
    }
  }
};
