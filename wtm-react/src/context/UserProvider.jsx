import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(()=>{
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  }); 

  const [token, setToken] = useState(()=>{
    const savedToken = sessionStorage.getItem('token');
    return savedToken? JSON.parse(savedToken) : null;
  })

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  return (
    <UserContext.Provider value={{ user, token, setToken, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};