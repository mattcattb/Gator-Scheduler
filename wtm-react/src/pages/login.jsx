import React from 'react';
import { useState } from 'react';
import {Box, Chip} from '@mui/material'
import { LoginGroup } from '../components/Login/logingroup';

import "../components/Login/login.css"


function doLogin(username, password, navigate){ // called when a user clicks login
  const loginData = {
    username: username,
    password: password
  };
  console.log("Login Attempted:", loginData);
  if(username === 'admin' && password === 'admin'){
    sessionStorage.setItem('token', 123456789);
    console.log('token added to session storage');
    navigate("/home")
  }
}

function doRegister(username, password){ // called when a user clicks register
  const registerData = {
    username: username,
    password: password
  };
  console.log("Register Attempted:", registerData);
}

function Login() {

  const [usernameLogin, setUsernameLogin] = useState('');  // State for username for login
  const [passwordLogin, setPasswordLogin] = useState('');  // State for password for login
  const [usernameRegister, setUsernameRegister] = useState('');  // State for username for login
  const [passwordRegister, setPasswordRegister] = useState('');  // State for password for login

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