import React from 'react';
import { Switch, Route } from 'react-router-dom';

import * as Routes from '../constants/routing';

// views
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import HomeModel from 'models/HomeModel';

const storeHome = new HomeModel();

const Router = () => (
  <Switch>
    <Route exact path={Routes.HOME} render={(props) => <Home {...props} store={storeHome} />} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Router;
