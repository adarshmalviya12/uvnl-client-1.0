import { createContext, useContext, useState } from "react";
import useColorMode from "../hooks/useColorMode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorMode, setColorMode] = useColorMode();

  const logout = () => {
    localStorage.removeItem("token");
    setColorMode("light");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    logout,
    loading,
    setLoading,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
