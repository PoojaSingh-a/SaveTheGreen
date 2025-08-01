import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added to indicate auth check is in progress

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true });
        setIsLoggedIn(true);
        setUserName(res.data.name);
      } catch (error) {
        setIsLoggedIn(false);
        setUserName('');
      } finally {
        setIsLoading(false); // Auth check completed
      }
    };
    checkAuthStatus();
  }, []);

  // Function to handle login success and update context state
  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserName('');
      // You can add a toast here if you like
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      // You can add an error toast here if you like
    }
  };

  // Provide login and logout functions along with state
  const value = { isLoggedIn, userName, login, logout, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);