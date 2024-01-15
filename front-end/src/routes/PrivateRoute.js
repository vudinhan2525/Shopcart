import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider/AuthProvider';
function PrivateRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Outlet /> : <Navigate to={'/'} />;
}

export default PrivateRoute;
