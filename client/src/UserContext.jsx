import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';  // Import jwt_decode correctly
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsAuthenticated(true);
          setUserRole(decoded.role); // Assuming role is in the token
        } catch (error) {
          console.error("Failed to decode token", error);
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    checkAuth(); // Check auth on initial load

    window.addEventListener('storage', checkAuth);  // Listen for token changes
    return () => window.removeEventListener('storage', checkAuth);  // Cleanup
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, userRole, setIsAuthenticated, setUserRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};
