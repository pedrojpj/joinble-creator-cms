import React from 'react';
import { Resolver } from 'found-relay';

import Routes from './routes';
import environment from './environment';
import { Notifications } from './components-ui';

const App = () => (
  <Notifications>
    <Routes resolver={new Resolver(environment)} />
  </Notifications>
);

export default App;
