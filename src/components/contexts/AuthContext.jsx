// contexts/AuthContext.js
import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component to provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login
  const login = () => {
    // Implement your login logic here...
    setIsAuthenticated(true);
  };

  // Function to handle user logout
  const logout = () => {
    // Implement your logout logic here...
    setIsAuthenticated(false);
  };

  // Value to be provided by the context
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;