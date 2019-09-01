import React from 'react';
import { Route, Redirect } from 'react-router';
import { isAuthenticated } from 'services/authService';
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
export default PrivateRoute;
