import React from 'react';
import { Route, Redirect } from 'react-router';
import { routePaths } from '../utils/constants';

const ProtectedRoute = ({children, isLoggedIn, ...props}) => {
  return (
    <Route {...props}>
      { isLoggedIn ? children : <Redirect to={routePaths.signin} />}
    </Route>
  );
};

export default ProtectedRoute;
