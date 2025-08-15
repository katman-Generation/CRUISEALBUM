import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );
  const [user, setUser] = useState(() => {
    if (authTokens) {
      const payload = JSON.parse(atob(authTokens.access.split('.')[1]));
      return payload;
    }
    return null;
  });

  const loginUser = async (username, password) => {
    const res = await axios.post('http://localhost:8000/api/token/', {
      username,
      password,
    });

    if (res.status === 200) {
      setAuthTokens(res.data);
      setUser(JSON.parse(atob(res.data.access.split('.')[1])));
      localStorage.setItem('authTokens', JSON.stringify(res.data));
      return true;
    }

    return false;
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    isAdmin: user?.is_staff,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
