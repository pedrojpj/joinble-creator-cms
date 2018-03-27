import React from 'react';

import { createFragmentContainer } from 'react-relay';

export const withFragment = query => Component =>
  createFragmentContainer(props => <Component {...props} />, query);
