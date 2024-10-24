import React, { useContext } from 'react';
import { useState } from 'react';
import {Box, Chip} from '@mui/material'
import { LoginGroup } from '../components/Login/logingroup';
import {UserContext} from '../context/UserProvider';
import userData from '../static_database/users.json';

import "../components/Login/login.css"

function Login() {

  const { setUser } = useContext(UserContext);
  const [usernameLogin, setUsernameLogin] = useState('');  // State for username for login
  const [passwordLogin, setPasswordLogin] = useState('');  // State for password for login
  const [usernameRegister, setUsernameRegister] = useState('');  // State for username for login
  const [passwordRegister, setPasswordRegister] = useState('');  // State for password for login

  async function doLogin(username, password, navigate){ // called when a user clicks login
    const loginData = {
      name: "Luke Li",
      username: username,
      password: password
    };
    console.log("Login Attempted:", loginData);
    if(username === 'admin' && password === 'admin'){
      sessionStorage.setItem('token', 123456789);
      setUser(userData[0]);
      console.log('token added to session storage');
      navigate("/home")
    }
  }
  
  async function doRegister(username, password){ // called when a user clicks register
    const registerData = {
      name: "Luke Li",
      username: username,
      password: password
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User registered successfully:', data);
      } else {
        console.error('Error:', data.msg);
      }
    }
    catch (error) {
      console.error('Network error:', error);
    }

    console.log("Register Attempted:", registerData);
  }

  return (
    <Box className="login-page">
      {/* consider moving to a component for styling */}
      <LoginGroup className="login-group"
        headerPrompt={"Already Registered?"}
        buttonPrompt={"Click to Login!"}
        username={usernameLogin}
        setUsername={setUsernameLogin}
        password={passwordLogin}
        setPassword={setPasswordLogin}
        button={doLogin}/>
      <LoginGroup className="register-group"
        headerPrompt={"Register Here"}
        buttonPrompt={"Click to Register!"}
        username={usernameRegister}
        setUsername={setUsernameRegister}
        password={passwordRegister}
        setPassword={setPasswordRegister}
        button={doRegister}/>
      <Chip label='just use "admin" and "admin" for now' style={{
        display: 'flex',
        alignSelf: 'center',
        width: 'fit-content',
        margin: 'auto',
      }}></Chip>
    </Box>
  );
}

export default Login;