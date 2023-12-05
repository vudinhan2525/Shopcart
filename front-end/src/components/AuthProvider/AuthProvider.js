import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userData, setUserData] = useState({});

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const ckLogged = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/isLoggedIn`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setIsLoggedIn(true);
        setUserData(response.data.data);
      } else if (response.data.status === 'loginfirsttime') {
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };
  const refreshUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}users/isLoggedIn`, {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setIsLoggedIn(true);
        setUserData(response.data.data);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    ckLogged();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, showLoginModal, setShowLoginModal, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
