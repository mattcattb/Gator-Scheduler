import React, { useState, createContext, useEffect } from 'react';

import { doLoginAPI, doRegisterAPI } from '../api/authService';

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

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

  const handleLogin = async (username, password) => {

    try {
      const result = await doLoginAPI(username, password);
      console.log("doLoginAPI result: ", result)
      setToken(result.token);
      setUser(result.userData);
      return {success: true, message: "User was logged in!"}

    } catch (error) {
      return {success:false, message:"An error occured during login."}
    }
  }

  const handleRegister = async (name, username, password) => {
    try {
      const result = await doRegisterAPI(name, username, password);
      setToken(result.token);
      setUser(result.userData);
      return {success:true, message: 'User was registered!'};
      
    } catch (error) {
      return {success: false, message: 'An error occured during registration.'};
    }
  }


  return (
    <UserContext.Provider value={{ user, token, setToken, setUser, handleLogout, handleLogin, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
};