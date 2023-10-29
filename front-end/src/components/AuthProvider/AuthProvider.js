import { createContext, useState } from 'react';
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { AuthContext };
