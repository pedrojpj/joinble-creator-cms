import React from 'react';
import {
  makeRouteConfig,
  createFarceRouter,
  Route,
  Redirect,
  queryMiddleware,
  createRender
} from 'found';

import HashProtocol from 'farce/lib/HashProtocol';

import { Home, Login, Error, CreateUser, Password } from './containers';
import { Layout, LayoutAuth } from './components/Layout';

export default createFarceRouter({
  historyProtocol: new HashProtocol(),
  historyMiddleware: [queryMiddleware],
  routeConfig: makeRouteConfig(
    <Route path="/">
      <Route path="/cms" Component={Layout}>
        <Route path="/home" Component={Home} />
      </Route>
      <Route path="/auth" Component={LayoutAuth}>
        <Route path="/login" Component={Login} />
        <Route path="/create-user" Component={CreateUser} />
        <Route path="/forgotten-password" Component={Password} />
      </Route>
      <Redirect from="/" to="/cms/home" />
    </Route>
  ),
  renderError: ({ error, ...rest }) => (
    <Error code={404} message="Sorry, page not found" {...rest} />
  ),
  render: createRender({})
});
