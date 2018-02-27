import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { Home, Login } from './containers';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
);

export default Routes;
