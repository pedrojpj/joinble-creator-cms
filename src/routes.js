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

import {
  Home,
  Login,
  Error,
  CreateUser,
  Password,
  ChangePassword,
  Layout,
  LayoutAuth,
  Profile,
  AppList,
  AppCreate,
  AppEdit,
  PageList,
  PageCreate,
  PageEdit
} from './containers';

export default createFarceRouter({
  historyProtocol: new HashProtocol(),
  historyMiddleware: [queryMiddleware],
  routeConfig: makeRouteConfig(
    <Route path="/">
      <Route path="/cms" Component={Layout}>
        <Route path="/home" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/app/list" Component={AppList} />
        <Route path="/app/create" Component={AppCreate} />
        <Route path="/app/edit/:id" Component={AppEdit} />
        <Route path="/app/:id/pages" Component={PageList} />
        <Route path="/app/:id/pages/create" Component={PageCreate} />
        <Route path="/app/:id/pages/edit/:pageId" Component={PageEdit} />
      </Route>
      <Route path="/auth" Component={LayoutAuth}>
        <Route path="/login" Component={Login} />
        <Route path="/create-user" Component={CreateUser} />
        <Route path="/forgotten-password" Component={Password} />
        <Route path="/change-password/:token" Component={ChangePassword} />
      </Route>
      <Redirect from="/" to="/cms/home" />
      <Route path="/error" Component={Error} />
    </Route>
  ),
  renderError: ({ error, ...rest }) => (
    <Error code={404} message="Sorry, page not found" {...rest} />
  ),
  render: createRender({})
});
