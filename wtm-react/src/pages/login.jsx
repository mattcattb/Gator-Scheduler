import React from 'react';
import { useState } from 'react';
import {Box} from '@mui/material'
import { LoginGroup } from '../components/Login/logingroup';


function doLogin(username, password){ // called when a user clicks login
  const loginData = {
    username: username,
    password: password
  };
  console.log("Login Attempted:", loginData);
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
    <Box className="Login-Page">
      {/* consider moving to a component for styling */}
      <LoginGroup
        headerPrompt={"Already Registered?"}
        buttonPrompt={"Click to Login!"}
        username={usernameLogin}
        setUsername={setUsernameLogin}
        password={passwordLogin}
        setPassword={setPasswordLogin}
        button={doLogin}/>
      <LoginGroup
        headerPrompt={"Register Here"}
        buttonPrompt={"Click to Register!"}
        username={usernameRegister}
        setUsername={setUsernameRegister}
        password={passwordRegister}
        setPassword={setPasswordRegister}
        button={doRegister}/>
    </Box>
  );
}

export default Login;