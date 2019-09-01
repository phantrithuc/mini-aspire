import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import AuthContainer from 'features/auth/AuthContainer';
import HomeContainer from 'features/home/HomeContainer';
import PrivateRoute from './PrivateRoute';

const AppNavigation = () => {
  return (
    <Switch>
      <Route path="/login" name="Auth" component={withRouter(AuthContainer)} />
      <PrivateRoute
        path="/"
        exact
        name="Home"
        component={withRouter(HomeContainer)}
      />
    </Switch>
  );
};

export default AppNavigation;
