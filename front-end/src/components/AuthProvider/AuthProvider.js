import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
      } else if (response.data.status === 'loginfirsttime') {
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    ckLogged();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
