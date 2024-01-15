import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
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
    } finally {
      setLoading(false); // Update loading state once the check is done
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
      value={{
        isLoggedIn,
        login,
        logout,
        userData,
        showLoginModal,
        setShowLoginModal,
        refreshUserData,
        showLogoutModal,
        setShowLogoutModal,
      }}
    >
      {loading ? ( // Show loading indicator or something while checking login status
        <div></div>
      ) : (
        children // Render children once loading is false
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
