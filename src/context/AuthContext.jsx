import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

const defaultUser = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@email.com',
  phone: '+977 9841-XXXXXX',
  avatar: null,
  memberSince: 'Jan 2024',
  tier: 'Gold',
  esewaId: 'ESW-2024-89012',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const logout = () => {
    toast.success('Logged out from demo session');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
