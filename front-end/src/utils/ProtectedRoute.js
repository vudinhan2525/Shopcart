import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider/AuthProvider';
function ProtectedRoute({ element: Component, ...rest }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    setIsLogIn(isLoggedIn);
  }, [isLoggedIn]);
  return isLogIn ? <Component /> : <Navigate to="/error" replace />;
}

export default ProtectedRoute;
