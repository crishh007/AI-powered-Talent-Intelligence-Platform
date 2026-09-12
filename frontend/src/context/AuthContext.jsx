import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER, USER_ROLES } from '../utils/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorageItem('auth_user', MOCK_USER));
  const [token, setToken] = useState(() => getStorageItem('auth_token', 'demo-token-active'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setStorageItem('auth_user', user);
    } else {
      removeStorageItem('auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      setStorageItem('auth_token', token);
    } else {
      removeStorageItem('auth_token');
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeStorageItem('auth_user');
    removeStorageItem('auth_token');
  };

  const switchRole = (newRole) => {
    if (!user) return;
    let updatedUser = { ...user, role: newRole };
    if (newRole === USER_ROLES.RECRUITER) {
      updatedUser.name = 'Sarah Jenkins';
      updatedUser.company = 'Vertex AI Systems';
      updatedUser.title = 'Head of Talent Acquisition';
    } else if (newRole === USER_ROLES.ADMIN) {
      updatedUser.name = 'System Administrator';
      updatedUser.title = 'Platform Security & Moderation';
    } else {
      updatedUser.name = 'Alex Rivera';
      updatedUser.title = 'Full Stack Engineer & AI Enthusiast';
    }
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        role: user?.role || USER_ROLES.STUDENT,
        login,
        logout,
        switchRole,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
