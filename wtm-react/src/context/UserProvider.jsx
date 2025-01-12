import React, { useState, createContext, useEffect } from 'react';

import { doLogin, doRegister } from '../api/userService';

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

    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.removeItem('token');
    }
  }, [user, token]);

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  const handleLogin = async (username, password) => {

    try {
      const result = await doLogin(username, password);
      if (result.success) {
        setToken(result.token);
        setUser(result.userData);
        return {success:true}
      } else {
        return { success:false, message:result.message }
      }
    } catch (error) {
      return {success:false, message:"An error occured during login."}
    }
  }

  const handleRegister = async (name, username, password) => {
    try {
      const result = await doRegister(name, username, password);
      if (result.success) {
        setToken(result.token);
        setUser(result.userData);
        return {success:true};
      } else {
        return {success: false, message:result.message}
      }
    } catch (error) {
      return {success: false, message: 'an error occured during registration.'};
    }
  }


  return (
    <UserContext.Provider value={{ user, token, setToken, setUser, logoutUser, handleLogin, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
};