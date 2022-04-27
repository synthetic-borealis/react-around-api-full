import React from 'react';
import { Navigate } from 'react-router';
import { routePaths } from '../utils/constants';

const ProtectedRoute = ({children, isLoggedIn}) => {
  if (!isLoggedIn) {
    return <Navigate to={routePaths.signin} />;
  }
  return children;
};

export default ProtectedRoute;
