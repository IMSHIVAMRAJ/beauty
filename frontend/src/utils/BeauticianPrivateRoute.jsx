import React from 'react';
import { Navigate } from 'react-router-dom';

const BeauticianPrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("beauticianToken");

  return isAuthenticated ? children : <Navigate to="/beautician/login" replace />;
};

export default BeauticianPrivateRoute;
