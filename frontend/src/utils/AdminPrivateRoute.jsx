import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken");

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;